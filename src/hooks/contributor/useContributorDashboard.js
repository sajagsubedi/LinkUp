import { useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";
import { useSupabaseClient } from "@/hooks/common/useSupabaseClient";

export const useContributorDashboard = () => {
  const { user } = useUser();
  const supabase = useSupabaseClient();

  const [stats, setStats] = useState({
    totalEvents: 0,
    totalInternships: 0,
    totalClubs: 0,
    totalMentorships: 0,
    thisWeekEvents: 0,
    thisWeekInternships: 0,
    thisWeekClubs: 0,
    thisWeekMentorships: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userPurpose, setUserPurpose] = useState(null);

  // Get user's purpose from metadata
  useEffect(() => {
    if (user?.unsafeMetadata?.purpose) {
      setUserPurpose(user.unsafeMetadata.purpose);
    }
  }, []);

  // Fetch dashboard statistics based on user's purpose
  const fetchStats = useCallback(async () => {
    if (!user || !userPurpose) return;

    try {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      // Initialize stats object
      const newStats = {
        totalEvents: 0,
        totalInternships: 0,
        totalClubs: 0,
        totalMentorships: 0,
        thisWeekEvents: 0,
        thisWeekInternships: 0,
        thisWeekClubs: 0,
        thisWeekMentorships: 0,
      };

      // Only fetch data relevant to user's purpose
      switch (userPurpose) {
        case "post-events": {
          const { data: eventsData, error: eventsError } = await supabase
            .from("events")
            .select("id, created_at")
            .eq("contributor_id", user.id);

          if (eventsError) throw eventsError;

          newStats.totalEvents = eventsData?.length || 0;
          newStats.thisWeekEvents = eventsData?.filter(
            event => new Date(event.created_at) >= oneWeekAgo
          ).length || 0;
          break;
        }

        case "post-internship": {
          const { data: internshipsData, error: internshipsError } = await supabase
            .from("internships")
            .select("id, created_at")
            .eq("contributor_id", user.id);

          if (internshipsError) throw internshipsError;

          newStats.totalInternships = internshipsData?.length || 0;
          newStats.thisWeekInternships = internshipsData?.filter(
            internship => new Date(internship.created_at) >= oneWeekAgo
          ).length || 0;
          break;
        }

        case "post-club": {
          const { data: clubsData, error: clubsError } = await supabase
            .from("clubs")
            .select("id, created_at")
            .eq("contributor_id", user.id);

          if (clubsError) throw clubsError;

          newStats.totalClubs = clubsData?.length || 0;
          newStats.thisWeekClubs = clubsData?.filter(
            club => new Date(club.created_at) >= oneWeekAgo
          ).length || 0;
          break;
        }

        case "provide-mentorship": {
          const { data: mentorshipsData, error: mentorshipsError } = await supabase
            .from("mentorships")
            .select("id, created_at")
            .eq("contributor_id", user.id);

          if (mentorshipsError) throw mentorshipsError;

          newStats.totalMentorships = mentorshipsData?.length || 0;
          newStats.thisWeekMentorships = mentorshipsData?.filter(
            mentorship => new Date(mentorship.created_at) >= oneWeekAgo
          ).length || 0;
          break;
        }

        default:
          break;
      }

      setStats(newStats);
    } catch (err) {
      console.error("Error fetching stats:", err);
      setError(err.message);
    }
  }, [supabase, user, userPurpose]);

  // Fetch recent activity based on user's purpose
  const fetchRecentActivity = useCallback(async () => {
    if (!user || !userPurpose) return;

    try {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      let allActivity = [];

      // Only fetch activity relevant to user's purpose
      switch (userPurpose) {
        case "post-events": {
          const { data: recentEvents, error: eventsError } = await supabase
            .from("events")
            .select("id, title, created_at, category")
            .eq("contributor_id", user.id)
            .gte("created_at", oneMonthAgo.toISOString())
            .order("created_at", { ascending: false })
            .limit(8);

          if (eventsError) throw eventsError;

          allActivity = recentEvents?.map(event => ({
            ...event,
            type: "event",
            displayName: event.title,
            subtitle: event.category,
          })) || [];
          break;
        }

        case "post-internship": {
          const { data: recentInternships, error: internshipsError } = await supabase
            .from("internships")
            .select("id, title, created_at, company")
            .eq("contributor_id", user.id)
            .gte("created_at", oneMonthAgo.toISOString())
            .order("created_at", { ascending: false })
            .limit(8);

          if (internshipsError) throw internshipsError;

          allActivity = recentInternships?.map(internship => ({
            ...internship,
            type: "internship",
            displayName: internship.title,
            subtitle: internship.company,
          })) || [];
          break;
        }

        case "post-club": {
          const { data: recentClubs, error: clubsError } = await supabase
            .from("clubs")
            .select("id, name, created_at, category")
            .eq("contributor_id", user.id)
            .gte("created_at", oneMonthAgo.toISOString())
            .order("created_at", { ascending: false })
            .limit(8);

          if (clubsError) throw clubsError;

          allActivity = recentClubs?.map(club => ({
            ...club,
            type: "club",
            displayName: club.name,
            subtitle: club.category,
          })) || [];
          break;
        }

        case "provide-mentorship": {
          const { data: recentMentorships, error: mentorshipsError } = await supabase
            .from("mentorships")
            .select("id, title, created_at, expertise_areas")
            .eq("contributor_id", user.id)
            .gte("created_at", oneMonthAgo.toISOString())
            .order("created_at", { ascending: false })
            .limit(8);

          if (mentorshipsError) throw mentorshipsError;

          allActivity = recentMentorships?.map(mentorship => ({
            ...mentorship,
            type: "mentorship",
            displayName: mentorship.title,
            subtitle: mentorship.expertise_areas?.[0] || "Mentorship",
          })) || [];
          break;
        }

        default:
          break;
      }

      setRecentActivity(allActivity);
    } catch (err) {
      console.error("Error fetching recent activity:", err);
      setError(err.message);
    }
  }, [supabase, user, userPurpose]);

  // Fetch all data
  const fetchDashboardData = useCallback(async () => {
    if (!userPurpose) return;
    
    setLoading(true);
    try {
      await Promise.all([fetchStats(), fetchRecentActivity()]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchStats, fetchRecentActivity, userPurpose]);

  useEffect(() => {
    if (userPurpose) {
      fetchDashboardData();
    }
  }, [userPurpose]);

  return {
    stats,
    recentActivity,
    loading,
    error,
    userPurpose,
    refreshData: fetchDashboardData,
  };
};
