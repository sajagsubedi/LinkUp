import React, { useMemo, useState } from "react";
import { Users, MapPin, Globe, Search, Filter } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const categories = [
  "all",
  "Technology",
  "Arts",
  "Business",
  "Sports",
  "Science",
  "Social",
];

const mockClubs = [
  {
    id: "c1",
    title: "Open Source Builders",
    description:
      "A community of contributors building useful open-source tools, libraries and apps.",
    image_url:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200",
    category: "Technology",
    location: "Remote",
    members: 328,
    created_by: "Dev Collective",
    isJoined: false,
  },
  {
    id: "c2",
    title: "Creative Designers Guild",
    description:
      "Design critiques, collaborations and portfolio reviews for modern creatives.",
    image_url:
      "https://images.pexels.com/photos/4348403/pexels-photo-4348403.jpeg?auto=compress&cs=tinysrgb&w=1200",
    category: "Arts",
    location: "Hybrid",
    members: 142,
    created_by: "Studio Nine",
    isJoined: true,
  },
  {
    id: "c3",
    title: "Startup Founders Circle",
    description:
      "Operators and builders discussing go-to-market, product strategy and fundraising.",
    image_url:
      "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1200",
    category: "Business",
    location: "San Francisco, CA",
    members: 512,
    created_by: "LaunchPad",
    isJoined: false,
  },
  {
    id: "c4",
    title: "AI Research Society",
    description:
      "Reading group for the latest ML papers, reproducible experiments and workshops.",
    image_url:
      "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=1200",
    category: "Science",
    location: "Remote",
    members: 289,
    created_by: "AIS Lab",
    isJoined: false,
  },
];

const ContributorClubsPage = () => {
  const [clubs, setClubs] = useState(mockClubs);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredClubs = useMemo(() => {
    return clubs.filter((club) => {
      const matchesSearch =
        club.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || club.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [clubs, searchTerm, categoryFilter]);

  const onToggleJoin = (id) => {
    setClubs((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const willJoin = !c.isJoined;
        return {
          ...c,
          isJoined: willJoin,
          members: Math.max(0, c.members + (willJoin ? 1 : -1)),
        };
      })
    );
  };

  const getBadgeClass = () =>
    "bg-accent text-accent-foreground border border-border";

  return (
    <div className="min-h-[80vh] w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-8 bg-background">
      <div className="mb-8 flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Clubs
          </h1>
          <p className="text-muted-foreground">
            Explore communities. Join clubs to collaborate and grow together.
          </p>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-lg p-4 sm:p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search clubs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-input bg-muted text-foreground placeholder:text-muted-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-input bg-muted text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredClubs.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No clubs found. Try different filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredClubs.map((club) => (
            <Card key={club.id} className="bg-card border-border border overflow-hidden">
              <div className="relative h-40 sm:h-48">
                {club.image_url ? (
                  <img
                    src={club.image_url}
                    alt={club.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeClass()}`}>
                    {club.category}
                  </span>
                </div>
              </div>
              <CardHeader className="pb-0">
                <CardTitle className="text-foreground text-lg">{club.title}</CardTitle>
                <CardDescription className="text-muted-foreground line-clamp-2">
                  {club.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {club.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    {club.members} members
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    by {club.created_by}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="text-sm text-foreground/70">{club.category}</div>
                <button
                  onClick={() => onToggleJoin(club.id)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border transition-colors ${
                    club.isJoined
                      ? "border-border text-foreground hover:bg-accent"
                      : "bg-primary text-primary-foreground hover:bg-primary/90 border-primary"
                  }`}
                >
                  {club.isJoined ? "Joined" : "Join Club"}
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContributorClubsPage;