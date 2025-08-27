import { useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";
import { useSupabaseClient } from "@/hooks/common/useSupabaseClient";
import { toast } from "react-toastify";

export const useContributorClubs = () => {
  const { user } = useUser();
  const supabase = useSupabaseClient();

  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch contributor's clubs
  const fetchClubs = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("clubs")
        .select("*")
        .eq("contributor_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setClubs(data || []);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to load clubs.");
    } finally {
      setLoading(false);
    }
  }, [supabase, user]);

  useEffect(() => {
    fetchClubs();
  }, []);

  // Add new club
  const addClub = async (club) => {
    if (!user) {
      setError("User not logged in");
      toast.error("You must be logged in to add clubs.");
      return null;
    }

    try {
      const { name, description, location, category, creator, image_url, is_active, requirements, benefits } = club;
      const newClub = {
        name,
        description,
        location,
        category,
        creator,
        image_url,
        is_active: is_active ?? true,
        members: 0,
        requirements: requirements || [],
        benefits: benefits || [],
      };

      const { data, error } = await supabase
        .from("clubs")
        .insert({ ...newClub, contributor_id: user.id })
        .select();

      if (error) throw error;

      setClubs((prev) => [data[0], ...prev]);
      return data[0];
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to add club.");
      return null;
    }
  };

  // Update existing club
  const updateClub = async (clubId, updates) => {
    if (!user) {
      setError("User not logged in");
      toast.error("You must be logged in to edit clubs.");
      return null;
    }

    try {
      const { data, error } = await supabase
        .from("clubs")
        .update({ ...updates })
        .eq("id", clubId)
        .eq("contributor_id", user.id)
        .select();

      if (error) throw error;

      const updated = data?.[0];
      if (updated) {
        setClubs((prev) => prev.map((c) => (c.id === clubId ? { ...c, ...updated } : c)));
      }
      return updated ?? null;
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to update club.");
      return null;
    }
  };

  // Delete club
  const deleteClub = async (clubId) => {
    if (!user) {
      setError("User not logged in");
      toast.error("You must be logged in to delete clubs.");
      return false;
    }

    try {
      const { error } = await supabase
        .from("clubs")
        .delete()
        .eq("id", clubId)
        .eq("contributor_id", user.id);

      if (error) throw error;

      setClubs((prev) => prev.filter((c) => c.id !== clubId));
      return true;
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to delete club.");
      return false;
    }
  };

  return { clubs, loading, error, fetchClubs, addClub, updateClub, deleteClub };
};
