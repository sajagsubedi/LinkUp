import { useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";
import { useSupabaseClient } from "@/hooks/common/useSupabaseClient";
import { toast } from "react-toastify";

export const useContributorEvents = () => {
  const { user } = useUser();
  const supabase = useSupabaseClient();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //fetch events
  const fetchEvents = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      console.log(user.id);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("contributor_id", user.id)
        .order("date", { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch contributor's events
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Add new event
  const addEvent = async (event) => {
    if (!user) {
      console.log("User not logged in");
      setError("You must be logged in to add events.");
      return null;
    }

    try {
      const {
        title,
        description,
        date,
        time,
        location,
        category,
        organizer,
        image_url,
      } = event;
      const newEvent = {
        title,
        description,
        date,
        time,
        location,
        category,
        organizer,
        attendees: 0,
        image_url,
      };

      const { data, error } = await supabase
        .from("events")
        .insert({ ...newEvent, contributor_id: user.id })
        .select();

      if (error) throw error;

      setEvents((prev) => [...prev, ...data]);
      return data[0];
    } catch (err) {
      console.log("Error adding event", err);
      setError(err.message);
      return null;
    }
  };

  // Update existing event
  const updateEvent = async (eventId, updates) => {
    if (!user) {
      setError("User not logged in");
      toast.error("You must be logged in to edit events.");
      return null;
    }

    try {
      const { data, error } = await supabase
        .from("events")
        .update({ ...updates })
        .eq("id", eventId)
        .eq("contributor_id", user.id)
        .select();

      if (error) throw error;

      const updated = data?.[0];
      if (updated) {
        setEvents((prev) =>
          prev.map((e) => (e.id === eventId ? { ...e, ...updated } : e))
        );
      }
      return updated ?? null;
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to update event.");
      return null;
    }
  };

  // Delete event
  const deleteEvent = async (eventId) => {
    if (!user) {
      setError("User not logged in");
      toast.error("You must be logged in to delete events.");
      return false;
    }

    try {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventId)
        .eq("contributor_id", user.id);

      if (error) throw error;

      setEvents((prev) => prev.filter((e) => e.id !== eventId));
      return true;
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to delete event.");
      return false;
    }
  };

  return { events, loading, error, addEvent, updateEvent, deleteEvent };
};
