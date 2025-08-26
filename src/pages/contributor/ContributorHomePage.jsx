import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Briefcase, Users, GraduationCap, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const purposeConfig = {
  "post-events": {
    title: "Events",
    icon: Calendar,
    link: "events",
    table: "events",
  },
  "post-internship": {
    title: "Internships",
    icon: Briefcase,
    link: "internships",
    table: "internships",
  },
  "post-club": {
    title: "Clubs",
    icon: Users,
    link: "clubs",
    table: "clubs",
  },
  "provide-mentorship": {
    title: "Mentorships",
    icon: GraduationCap,
    link: "mentors",
    table: "mentorships",
  },
};

export default function ContributorHomePage() {
  const [stats, setStats] = useState({ totalPosts: 0, recentPosts: 0 });
  const [loading, setLoading] = useState(true);

  const config = purposeConfig["post-events"];
  const Icon = config.icon;

  return (
    <main className="space-y-6 p-6 min-h-screen">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-2">Welcome back, Sajag Subedi</h2>
        <p className="text-blue-100">
          You are contributing by posting {config.title.toLowerCase()}.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total {config.title}
            </CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : stats.totalPosts}
            </div>
            <p className="text-xs text-muted-foreground">
              {config.title} you've created
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : stats.recentPosts}
            </div>
            <p className="text-xs text-muted-foreground">
              New {config.title.toLowerCase()} added
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Action</CardTitle>
          </CardHeader>
          <CardContent>
            <Link to={config.link}>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Manage {config.title}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <p className="font-medium">
                  Create your first {config.title.toLowerCase()}
                </p>
                <p className="text-sm text-muted-foreground">
                  Start contributing by creating your first
                  {config.title.toLowerCase()} post.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Engage with the community</p>
                <p className="text-sm text-muted-foreground">
                  Connect with students and help build our community.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
