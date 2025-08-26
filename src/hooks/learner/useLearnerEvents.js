import { useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";
import { useSupabaseClient } from "@/hooks/common/useSupabaseClient";
import { toast } from "react-toastify";

export const useLearnerEvents = () => {
  const { user } = useUser();
  const supabase = useSupabaseClient();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all events for learners
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("is_active", true)
        .order("date", { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  }, []);

  // Join an event
  const joinEvent = async (eventId) => {
    if (!user) {
      toast.error("You must be logged in to join events");
      return false;
    }

    try {
      // Check if user is already registered for this event
      const { data: existingRegistration } = await supabase
        .from("event_registrations")
        .select("id")
        .eq("event_id", eventId)
        .eq("user_id", user.id)
        .single();

      if (existingRegistration) {
        toast.info("You are already registered for this event");
        return false;
      }

      // Get event details to check capacity
      const { data: event } = await supabase
        .from("events")
        .select("max_attendees, attendees")
        .eq("id", eventId)
        .single();

      if (event && event.attendees >= event.max_attendees) {
        toast.error("This event is already full");
        return false;
      }

      // Register user for the event
      const { error: registrationError } = await supabase
        .from("event_registrations")
        .insert({
          event_id: eventId,
          user_id: user.id,
          registration_date: new Date().toISOString(),
        });

      if (registrationError) throw registrationError;

      // Update event attendee count
      const { error: updateError } = await supabase
        .from("events")
        .update({ attendees: (event?.attendees || 0) + 1 })
        .eq("id", eventId);

      if (updateError) throw updateError;

      // Refresh events list
      await fetchEvents();
      toast.success("Successfully joined the event!");
      return true;
    } catch (err) {
      console.error("Error joining event:", err);
      toast.error(err.message || "Failed to join event");
      return false;
    }
  };

  // Leave an event
  const leaveEvent = async (eventId) => {
    if (!user) {
      toast.error("You must be logged in to leave events");
      return false;
    }

    try {
      // Remove user registration
      const { error: registrationError } = await supabase
        .from("event_registrations")
        .delete()
        .eq("event_id", eventId)
        .eq("user_id", user.id);

      if (registrationError) throw registrationError;

      // Update event attendee count
      const { error: updateError } = await supabase
        .from("events")
        .update({ attendees: Math.max(0, (event?.attendees || 1) - 1) })
        .eq("id", eventId);

      if (updateError) throw updateError;

      // Refresh events list
      await fetchEvents();
      toast.success("Successfully left the event");
      return true;
    } catch (err) {
      console.error("Error leaving event:", err);
      toast.error(err.message || "Failed to leave event");
      return false;
    }
  };

  // Check if user is registered for an event
  const isUserRegistered = useCallback(async (eventId) => {
    if (!user) return false;

    try {
      const { data } = await supabase
        .from("event_registrations")
        .select("id")
        .eq("event_id", eventId)
        .eq("user_id", user.id)
        .single();

      return !!data;
    } catch {
      return false;
    }
  }, []);

  // Fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    joinEvent,
    leaveEvent,
    isUserRegistered,
    refreshEvents: fetchEvents,
  };
};
