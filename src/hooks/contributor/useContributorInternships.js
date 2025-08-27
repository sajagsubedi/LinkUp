import { useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";
import { useSupabaseClient } from "@/hooks/common/useSupabaseClient";
import { toast } from "react-toastify";

export const useContributorInternships = () => {
  const { user } = useUser();
  const supabase = useSupabaseClient();

  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch internships created by the current contributor
  const fetchInternships = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("internships")
        .select("*")
        .eq("contributor_id", user.id)
        .order("deadline", { ascending: true });

      if (error) throw error;
      setInternships(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  // Fetch contributor's internships on mount
  useEffect(() => {
    fetchInternships();
  }, []);

  // Add new internship
  const addInternship = async (internship) => {
    if (!user) {
      console.log("User not logged in");
      setError("You must be logged in to add internships.");
      return null;
    }

    try {
      const {
        title,
        company,
        description,
        location,
        type,
        duration,
        stipend,
        requirements,
        deadline,
      } = internship;

      const newInternship = {
        title,
        company,
        description,
        location,
        type,
        duration,
        stipend,
        requirements,
        deadline,
        applicants: 0,
        posted_date: new Date().toISOString().split("T")[0],
      };

      const { data, error } = await supabase
        .from("internships")
        .insert({ ...newInternship, contributor_id: user.id })
        .select();

      if (error) throw error;

      setInternships((prev) => [...prev, ...data]);
      toast.success("Internship opportunity added successfully");
      return data[0];
    } catch (err) {
      console.log("Error adding internship", err);
      setError(err.message);
      toast.error(err.message || "Failed to add internship opportunity");
      return null;
    }
  };

  // Update existing internship
  const updateInternship = async (internshipId, updates) => {
    if (!user) {
      setError("User not logged in");
      toast.error("You must be logged in to edit internships.");
      return null;
    }

    try {
      const { data, error } = await supabase
        .from("internships")
        .update({ ...updates })
        .eq("id", internshipId)
        .eq("contributor_id", user.id)
        .select();

      if (error) throw error;

      const updated = data?.[0];
      if (updated) {
        setInternships((prev) =>
          prev.map((i) => (i.id === internshipId ? { ...i, ...updated } : i))
        );
        toast.success("Internship updated successfully");
      }
      return updated ?? null;
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to update internship.");
      return null;
    }
  };

  // Delete internship
  const deleteInternship = async (internshipId) => {
    if (!user) {
      setError("User not logged in");
      toast.error("You must be logged in to delete internships.");
      return false;
    }

    try {
      const { error } = await supabase
        .from("internships")
        .delete()
        .eq("id", internshipId)
        .eq("contributor_id", user.id);

      if (error) throw error;

      setInternships((prev) => prev.filter((i) => i.id !== internshipId));
      toast.success("Internship deleted successfully");
      return true;
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to delete internship.");
      return false;
    }
  };

  // Get applications for a specific internship
  const getApplications = async (internshipId) => {
    if (!user) {
      setError("User not logged in");
      toast.error("You must be logged in to view applications.");
      return [];
    }

    try {
      // First verify this internship belongs to the contributor
      const { data: internshipData, error: internshipError } = await supabase
        .from("internships")
        .select("id")
        .eq("id", internshipId)
        .eq("contributor_id", user.id)
        .single();

      if (internshipError || !internshipData) {
        throw new Error("You don't have permission to view these applications");
      }

      // Get applications with user information
      const { data, error } = await supabase
        .from("internship_applications")
        .select(
          `
          id, 
          application_date, 
          status,
          user_id
        `
        )
        .eq("internship_id", internshipId);

      if (error) throw error;
      return data || [];
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to fetch applications.");
      return [];
    }
  };

  // Update application status (accept/reject)
  const updateApplicationStatus = async (applicationId, status) => {
    if (!user) {
      setError("User not logged in");
      toast.error("You must be logged in to update application status.");
      return false;
    }

    try {
      // First verify this application is for an internship owned by the contributor
      const { data: appData, error: appError } = await supabase
        .from("internship_applications")
        .select(
          `
          internship_id
        `
        )
        .eq("id", applicationId)
        .single();

      if (appError || !appData) {
        throw new Error("Application not found");
      }

      const { data: internshipData, error: internshipError } = await supabase
        .from("internships")
        .select("id")
        .eq("id", appData.internship_id)
        .eq("contributor_id", user.id)
        .single();

      if (internshipError || !internshipData) {
        throw new Error("You don't have permission to update this application");
      }

      // Update the application status
      const { error } = await supabase
        .from("internship_applications")
        .update({ status })
        .eq("id", applicationId);

      if (error) throw error;
      toast.success(`Application ${status} successfully`);
      return true;
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to update application status.");
      return false;
    }
  };

  return {
    internships,
    loading,
    error,
    refreshInternships: fetchInternships,
    addInternship,
    updateInternship,
    deleteInternship,
    getApplications,
    updateApplicationStatus,
  };
};
