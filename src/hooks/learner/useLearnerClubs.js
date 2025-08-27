import { useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";
import { useSupabaseClient } from "@/hooks/common/useSupabaseClient";
import { toast } from "react-toastify";

export const useLearnerClubs = () => {
  const { user } = useUser();
  const supabase = useSupabaseClient();

  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all active clubs for learners
  const fetchClubs = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("clubs")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setClubs(data || []);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to fetch clubs");
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  // Join a club
  const joinClub = async (clubId) => {
    if (!user) {
      toast.error("You must be logged in to join clubs");
      return false;
    }

    try {
      // Check if user is already a member of this club
      const { data: existingMembership } = await supabase
        .from("club_members")
        .select("id")
        .eq("club_id", clubId)
        .eq("user_id", user.id)
        .single();

      if (existingMembership) {
        toast.info("You are already a member of this club");
        return false;
      }

      // Add user to club members
      const { error: membershipError } = await supabase
        .from("club_members")
        .insert({
          club_id: clubId,
          user_id: user.id,
          joined_at: new Date().toISOString(),
        });

      if (membershipError) throw membershipError;

      // Update club member count
      const { error: updateError } = await supabase
        .from("clubs")
        .update({ members: supabase.rpc('increment', { row_id: clubId, table_name: 'clubs', column_name: 'members' }) })
        .eq("id", clubId);

      if (updateError) throw updateError;

      // Refresh clubs list
      await fetchClubs();
      toast.success("Successfully joined the club!");
      return true;
    } catch (err) {
      console.error("Error joining club:", err);
      toast.error(err.message || "Failed to join club");
      return false;
    }
  };

  // Leave a club
  const leaveClub = async (clubId) => {
    if (!user) {
      toast.error("You must be logged in to leave clubs");
      return false;
    }

    try {
      // Remove user from club members
      const { error: membershipError } = await supabase
        .from("club_members")
        .delete()
        .eq("club_id", clubId)
        .eq("user_id", user.id);

      if (membershipError) throw membershipError;

      // Update club member count
      const { error: updateError } = await supabase
        .from("clubs")
        .update({ members: supabase.rpc('decrement', { row_id: clubId, table_name: 'clubs', column_name: 'members' }) })
        .eq("id", clubId);

      if (updateError) throw updateError;

      // Refresh clubs list
      await fetchClubs();
      toast.success("Successfully left the club");
      return true;
    } catch (err) {
      console.error("Error leaving club:", err);
      toast.error(err.message || "Failed to leave club");
      return false;
    }
  };

  // Check if user is a member of a club
  const isUserMember = useCallback(async (clubId) => {
    if (!user) return false;

    try {
      const { data } = await supabase
        .from("club_members")
        .select("id")
        .eq("club_id", clubId)
        .eq("user_id", user.id)
        .single();

      return !!data;
    } catch {
      return false;
    }
  }, [supabase, user]);

  // Fetch clubs on mount
  useEffect(() => {
    fetchClubs();
  }, []);

  return {
    clubs,
    loading,
    error,
    joinClub,
    leaveClub,
    isUserMember,
    refreshClubs: fetchClubs,
  };
};
