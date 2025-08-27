import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Briefcase,
  Users,
  GraduationCap,
  Plus,
  TrendingUp,
  Activity,
  Clock,
  Target,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useContributorDashboard } from "@/hooks/contributor/useContributorDashboard";

const purposeConfig = {
  "post-events": {
    title: "Events",
    icon: Calendar,
    link: "events",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    iconColor: "text-blue-600",
    description: "Share and organize community events",
  },
  "post-internship": {
    title: "Internships",
    icon: Briefcase,
    link: "internships",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    iconColor: "text-green-600",
    description: "Share internship opportunities",
  },
  "post-club": {
    title: "Clubs",
    icon: Users,
    link: "clubs",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    iconColor: "text-purple-600",
    description: "Create and manage club activities",
  },
  "provide-mentorship": {
    title: "Mentorships",
    icon: GraduationCap,
    link: "mentors",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    iconColor: "text-orange-600",
    description: "Guide and mentor other learners",
  },
};

export default function ContributorHomePage() {
  const { stats, recentActivity, loading, error, userPurpose } =
    useContributorDashboard();

  // Get config based on user's actual purpose
  const config = userPurpose
    ? purposeConfig[userPurpose]
    : purposeConfig["post-events"];
  const Icon = config.icon;

  // Calculate total contributions based on user's purpose
  const getTotalContributions = () => {
    switch (userPurpose) {
      case "post-events":
        return stats.totalEvents;
      case "post-internship":
        return stats.totalInternships;
      case "post-club":
        return stats.totalClubs;
      case "provide-mentorship":
        return stats.totalMentorships;
      default:
        return 0;
    }
  };

  const getThisWeekContributions = () => {
    switch (userPurpose) {
      case "post-events":
        return stats.thisWeekEvents;
      case "post-internship":
        return stats.thisWeekInternships;
      case "post-club":
        return stats.thisWeekClubs;
      case "provide-mentorship":
        return stats.thisWeekMentorships;
      default:
        return 0;
    }
  };

  // Activity type icons
  const getActivityIcon = (type) => {
    switch (type) {
      case "event":
        return Calendar;
      case "internship":
        return Briefcase;
      case "club":
        return Users;
      case "mentorship":
        return GraduationCap;
      default:
        return Activity;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  // Show loading if no purpose is set yet
  if (!userPurpose) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="animate-pulse">
            <div className="h-32 bg-muted rounded-xl mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded-xl"></div>
              ))}
            </div>
            <div className="h-64 bg-muted rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <div
          className={`bg-gradient-to-r ${config.color} text-white rounded-2xl p-8 shadow-lg relative overflow-hidden`}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-yellow-200" />
              <h1 className="text-4xl font-bold">Welcome back!</h1>
            </div>
            <p className="text-xl text-blue-50 mb-6">
              You're making a difference by contributing{" "}
              {config.title.toLowerCase()} to our community.
            </p>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm text-blue-100">
                  Total {config.title}
                </span>
                <div className="text-2xl font-bold">
                  {getTotalContributions()}
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm text-blue-100">This Week</span>
                <div className="text-2xl font-bold">
                  {getThisWeekContributions()}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
        </div>

        {/* Main Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Primary Purpose Card */}
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Total {config.title}
              </CardTitle>
              <div className={`p-2 ${config.bgColor} rounded-lg`}>
                <Icon className={`h-4 w-4 ${config.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {getTotalContributions()}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm text-muted-foreground">
                  +{getThisWeekContributions()} this week
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Action Card */}
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Quick Action
              </CardTitle>
              <div className={`p-2 ${config.bgColor} rounded-lg`}>
                <Plus className={`h-4 w-4 ${config.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <Link to={config.link}>
                <Button className={`w-full hover:opacity-90 text-white`}>
                  Create New {config.title.slice(0, -1)}
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Getting Started Card */}
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Getting Started
              </CardTitle>
              <div className={`p-2 ${config.bgColor} rounded-lg`}>
                <Target className={`h-4 w-4 ${config.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                {config.description}
              </p>
              <Link to={config.link}>
                <Button variant="outline" className="w-full">
                  Manage {config.title}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Target className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to={config.link}>
                  <Button
                    className={`w-full justify-between ${config.color
                      .replace("from-", "bg-")
                      .replace(" to-", "")} hover:opacity-90 text-white`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      Manage {config.title}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to={config.link}>
                  <Button variant="outline" className="w-full justify-between">
                    <span className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Create New {config.title.slice(0, -1)}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Getting Started */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Award className="h-5 w-5 text-primary" />
                  Getting Started
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-foreground">
                      Create your first{" "}
                      {config.title.toLowerCase().slice(0, -1)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Start contributing by creating your first{" "}
                      {config.title.toLowerCase().slice(0, -1)}.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-muted rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-foreground">
                      Engage with community
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Connect with students and help build our community.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Activity className="h-5 w-5 text-primary" />
                  Recent {config.title} Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentActivity.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivity.map((activity) => {
                      const ActivityIcon = getActivityIcon(activity.type);
                      return (
                        <div
                          key={`${activity.type}-${activity.id}`}
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className={`p-2 ${config.bgColor} rounded-lg`}>
                            <ActivityIcon
                              className={`h-4 w-4 ${config.iconColor}`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">
                              {activity.displayName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {activity.subtitle}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {formatDate(activity.created_at)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No recent {config.title.toLowerCase()} yet
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Start creating {config.title.toLowerCase()} to see your
                      activity here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="bg-destructive/10 border-destructive/20">
            <CardContent className="pt-6">
              <p className="text-destructive text-center">
                Error loading dashboard: {error}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
