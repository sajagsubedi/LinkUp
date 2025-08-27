import React, { useState } from "react";
import {
  Users,
  MapPin,
  Globe,
  Search,
  Filter,
  CheckCircle,
  UserPlus,
  Calendar,
  Target,
  Gift,
  ClubIcon,
} from "lucide-react";
import { useLearnerClubs } from "@/hooks/learner/useLearnerClubs";
import { Button } from "@/components/ui/button";

const Clubs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { clubs, loading, error } = useLearnerClubs();

  const categories = [
    "All",
    "Technology",
    "Arts",
    "Business",
    "Sports",
    "Science",
    "Social",
  ];

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || club.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleClubAction = async (clubId) => {
    console.log("Handle club action", clubId);
  };

  // Category badge color using tokens
  const getCategoryColor = () => "bg-accent text-accent-foreground";

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[80vh] w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-8 bg-background">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading clubs...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-[80vh] w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-8 bg-background">
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h3 className="text-xl font-medium text-foreground mb-2">
            Error loading clubs
          </h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-8 bg-background">
      {/* Header section: Title and description */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Discover Clubs
        </h1>
        <p className="text-muted-foreground">
          Find exciting clubs happening near you or explore opportunities
          further away
        </p>
      </div>

      {/* Search and Category Filter section */}
      <div className="bg-card rounded-xl border border-border shadow-lg p-4 sm:p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search input for club name or description */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search clubs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-input bg-muted text-foreground placeholder:text-muted-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Category dropdown for club type */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-input bg-muted text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Clubs Grid: Display filtered club cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Render each club card */}
        {filteredClubs.map((club) => {
          return (
            <div
              key={club.id}
              className="bg-card border border-border rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-2"
            >
              {/* Club image and category badge */}
              <div className="relative h-40 sm:h-48">
                <img
                  src={club.image_url || "/assets/placeholder.png"}
                  alt={club.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                      club.category
                    )}`}
                  >
                    {club.category}
                  </span>
                </div>
              </div>

              {/* Club details and actions */}
              <div className="p-4 sm:p-6">
                {/* Club name and description */}
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {club.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {club.description}
                </p>

                {/* Club info rows: location, members, creator */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {club.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    {club.members || 0} members
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Globe className="w-4 h-4 mr-2" />
                    by {club.creator || "Unknown"}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(club.created_at).toLocaleDateString()}
                  </div>
                </div>

                {/* Requirements */}
                {club.requirements && club.requirements.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center gap-1 mb-2">
                      <Target className="w-3 h-3 text-blue-600" />
                      <span className="text-xs font-medium text-foreground">
                        Requirements
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {club.requirements.slice(0, 2).map((req, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs border border-blue-200"
                        >
                          {req}
                        </span>
                      ))}
                      {club.requirements.length > 2 && (
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs border border-blue-200">
                          +{club.requirements.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Benefits */}
                {club.benefits && club.benefits.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-1 mb-2">
                      <Gift className="w-3 h-3 text-green-600" />
                      <span className="text-xs font-medium text-foreground">
                        Benefits
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {club.benefits.slice(0, 2).map((benefit, index) => (
                        <span
                          key={index}
                          className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs border border-green-200"
                        >
                          {benefit}
                        </span>
                      ))}
                      {club.benefits.length > 2 && (
                        <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs border border-green-200">
                          +{club.benefits.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Creator and Join/Leave button */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-foreground/70">
                    by {club.creator || "Unknown"}
                  </div>
                  <Button
                    onClick={() => handleClubAction(club.id)}
                    variant={"default"}
                    className={`flex items-center gap-2ँ`}
                  >
                    <UserPlus className="w-4 h-4" />
                    Join Club
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No clubs found message */}
      {filteredClubs.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium text-foreground mb-2">
            No clubs found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find more clubs.
          </p>
        </div>
      )}
    </div>
  );
};

export default Clubs;
