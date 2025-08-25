import { useState, useEffect, useCallback } from "react";
import { supabase } from "../services/supabaseClient.ts";
import type { Session } from "@supabase/supabase-js";

// Define types for user and admin
export interface Where2GOUser {
  id: string;
  profile_picture?: string;
  email: string | undefined;
  fullname: string | undefined;
  account_type?: "learner" | "contributor" | "admin";
  purpose?: string;
}

interface AuthState {
  user: Where2GOUser | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

// Subscribe to auth state changes
interface AuthSubscription {
  unsubscribe: () => void;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  });

  // Fetch user profile and purpose from Supabase
  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, profile_picture, email, fullname, account_type, purpose")
        .eq("id", userId)
        .single();

      if (profileError) throw new Error(profileError.message);

      return {
        id: profile.id,
        email: profile.email,
        fullname: profile.fullname,
        account_type: profile.account_type,
        purpose: profile.purpose,
      };
    } catch (err) {
      console.log("Error fetching user profile:", err);
      throw new Error(
        err instanceof Error ? err.message : "Failed to fetch user profile"
      );
    }
  }, []);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log("Initializing auth ...")
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user) {
          const userProfile = await fetchUserProfile(session.user.id);
          setAuthState({
            user: userProfile,
            session,
            loading: false,
            error: null,
          });
        } else {
          setAuthState({
            user: null,
            session: null,
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        setAuthState({
          user: null,
          session: null,
          loading: false,
          error:
            err instanceof Error ? err.message : "Auth initialization failed",
        });
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    }: { data: { subscription: AuthSubscription } } =
      supabase.auth.onAuthStateChange(
        async (event: string, session: Session | null) => {
          if (event === "SIGNED_IN" && session?.user) {
            try {
              const userProfile = await fetchUserProfile(session.user.id);
              setAuthState({
                user: userProfile,
                session,
                loading: false,
                error: null,
              });
            } catch (err) {
              setAuthState({
                user: null,
                session: null,
                loading: false,
                error:
                  err instanceof Error
                    ? err.message
                    : "Failed to fetch user profile",
              });
            }
          } else if (event === "SIGNED_OUT") {
            setAuthState({
              user: null,
              session: null,
              loading: false,
              error: null,
            });
          }
        }
      );

    return () => subscription.unsubscribe();
  }, [fetchUserProfile]);

  // Login function
  const login = async (
    email: string,
    password: string
  ): Promise<{ status: boolean; message: string }> => {
    setAuthState((prev) => ({ ...prev, error: null }));

    try {
      console.log("Login phase 1");
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log("Login phase 2", data);

      if (error) throw new Error(error.message);

      if (data.user) {
        const userProfile = await fetchUserProfile(data.user.id);
        setAuthState({
          user: userProfile,
          session: data.session,
          loading: false,
          error: null,
        });
      }
      return { status: true, message: "Login successful" };
    } catch (err) {
      console.log("Error logging in:", err);
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setAuthState((v) => ({
        ...v,
        loading: false,
        error: errorMessage,
      }));
      return { status: false, message: errorMessage };
    }
  };

  // Signup function (users only)
  const signup = async (
    profile_picture: string,
    fullname: string,
    email: string,
    password: string,
    account_type: string,
    purpose?: string
  ): Promise<{ status: boolean; message: string }> => {
    // Validate required fields
    if (!email || !password || !fullname || !account_type) {
      const errorMessage =
        "All required fields (fullname, email, password, account_type) must be provided";
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return { status: false, message: errorMessage };
    }

    // Validate account_type
    if (!["learner", "contributor"].includes(account_type)) {
      const errorMessage =
        "Invalid account_type. Must be 'learner' or 'contributor'";
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return { status: false, message: errorMessage };
    }

    // Validate purpose for contributor
    if (account_type === "contributor" && !purpose) {
      const errorMessage = "Purpose is required for contributor account type";
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return { status: false, message: errorMessage };
    }

    // Validate email format (basic regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const errorMessage = "Invalid email format";
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return { status: false, message: errorMessage };
    }

    // Validate password length (e.g., minimum 8 characters)
    if (password.length < 8) {
      const errorMessage = "Password must be at least 8 characters long";
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return { status: false, message: errorMessage };
    }

    setAuthState((prev) => ({ ...prev, error: null }));
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        if (error.message.includes("duplicate key value")) {
          throw new Error("User with this email already exists");
        }
        throw new Error(error.message);
      }

      if (data.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          profile_picture,
          email,
          fullname,
          account_type,
          purpose,
        });

        if (profileError) {
          if (profileError.message.includes("duplicate key value")) {
            throw new Error("Profile with this ID already exists");
          }
          throw new Error(profileError.message);
        }

        setAuthState({
          user: null,
          session: null,
          loading: false,
          error: null,
        });
        return { status: true, message: "Signup successful" };
      }
      return { status: false, message: "Signup failed: No user data returned" };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Signup failed";
      setAuthState({
        ...authState,
        loading: false,
        error: errorMessage,
      });
      return { status: false, message: errorMessage };
    }
  };

  // Logout function
  const logout = async (): Promise<{ status: boolean; message: string }> => {
    setAuthState((prev) => ({ ...prev, error: null }));
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);
      setAuthState({ user: null, session: null, loading: false, error: null });
      return { status: true, message: "Logout successful" };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Logout failed";
      setAuthState({
        ...authState,
        loading: false,
        error: errorMessage,
      });
      return { status: false, message: errorMessage };
    }
  };

  return {
    authState,
    user: authState.user,
    session: authState.session,
    loading: authState.loading,
    error: authState.error,
    login,
    signup,
    logout,
  };
};
