import { useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";
import { useSupabaseClient } from "@/hooks/common/useSupabaseClient";
import { toast } from "react-toastify";

export const useLearnerInternships = () => {
  const { user } = useUser();
  const supabase = useSupabaseClient();

  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all active internships for learners
  const fetchInternships = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("internships")
        .select("*")
        .eq("is_active", true)
        .order("deadline", { ascending: true });

      if (error) throw error;
      setInternships(data || []);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to fetch internships");
    } finally {
      setLoading(false);
    }
  }, []);

  // Apply for an internship
  const applyForInternship = async (internshipId) => {
    if (!user) {
      toast.error("You must be logged in to apply for internships");
      return false;
    }

    try {
      // Check if user has already applied for this internship
      const { data: existingApplication } = await supabase
        .from("internship_applications")
        .select("id")
        .eq("internship_id", internshipId)
        .eq("user_id", user.id)
        .single();

      if (existingApplication) {
        toast.info("You have already applied for this internship");
        return false;
      }

      // Submit application
      const { error: applicationError } = await supabase
        .from("internship_applications")
        .insert({
          internship_id: internshipId,
          user_id: user.id,
          application_date: new Date().toISOString(),
          status: "pending",
        });

      if (applicationError) throw applicationError;

      // Update internship applicant count
      const { data: internship } = await supabase
        .from("internships")
        .select("applicants")
        .eq("id", internshipId)
        .single();

      const { error: updateError } = await supabase
        .from("internships")
        .update({ applicants: (internship?.applicants || 0) + 1 })
        .eq("id", internshipId);

      if (updateError) throw updateError;

      // Refresh internships list
      await fetchInternships();
      toast.success("Successfully applied for the internship");
      return true;
    } catch (err) {
      console.error("Error applying for internship:", err);
      toast.error(err.message || "Failed to apply for internship");
      return false;
    }
  };

  // Withdraw application from an internship
  const withdrawApplication = async (internshipId) => {
    if (!user) {
      toast.error("You must be logged in to withdraw applications");
      return false;
    }

    try {
      // Remove user application
      const { error: applicationError } = await supabase
        .from("internship_applications")
        .delete()
        .eq("internship_id", internshipId)
        .eq("user_id", user.id);

      if (applicationError) throw applicationError;

      // Update internship applicant count
      const { data: internship } = await supabase
        .from("internships")
        .select("applicants")
        .eq("id", internshipId)
        .single();

      const { error: updateError } = await supabase
        .from("internships")
        .update({ applicants: Math.max(0, (internship?.applicants || 1) - 1) })
        .eq("id", internshipId);

      if (updateError) throw updateError;

      // Refresh internships list
      await fetchInternships();
      toast.success("Successfully withdrew application");
      return true;
    } catch (err) {
      console.error("Error withdrawing application:", err);
      toast.error(err.message || "Failed to withdraw application");
      return false;
    }
  };

  // Check if user has applied for an internship
  const hasApplied = useCallback(async (internshipId) => {
    if (!user) return false;

    try {
      const { data } = await supabase
        .from("internship_applications")
        .select("id, status")
        .eq("internship_id", internshipId)
        .eq("user_id", user.id)
        .single();

      return data
        ? { applied: true, status: data.status }
        : { applied: false, status: null };
    } catch {
      return { applied: false, status: null };
    }
  }, []);

  // Get all applications made by the current user
  const getUserApplications = useCallback(async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from("internship_applications")
        .select(
          `
          id,
          application_date,
          status,
          internships:internship_id(*)
        `
        )
        .eq("user_id", user.id);

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error("Error fetching user applications:", err);
      return [];
    }
  }, []);

  // Fetch internships on mount
  useEffect(() => {
    fetchInternships();
  }, []);

  return {
    internships,
    loading,
    error,
    applyForInternship,
    withdrawApplication,
    hasApplied,
    getUserApplications,
    refreshInternships: fetchInternships,
  };
};
