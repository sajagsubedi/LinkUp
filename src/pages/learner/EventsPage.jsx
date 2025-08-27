import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Filter,
  Search,
  CheckCircle,
  UserPlus,
} from "lucide-react";
import { useLearnerEvents } from "@/hooks/learner/useLearnerEvents";
import { Button } from "@/components/ui/button";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Use the learner events hook
  const { events, loading, error } = useLearnerEvents();

  // Available event categories for filtering
  const categories = [
    "all",
    "Career",
    "Workshop",
    "Education",
    "Competition",
    "Networking",
    "Conference",
  ];

  // Check user registrations for all events

  // Filter events based on search and selected category
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Category badge color using tokens
  const getCategoryColor = () => "bg-accent text-accent-foreground";

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[80vh] w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-8 bg-background">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading events...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-[80vh] w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-8 bg-background">
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h3 className="text-xl font-medium text-foreground mb-2">
            Error loading events
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
          Discover Events
        </h1>
        <p className="text-muted-foreground">
          Find exciting events happening near you or explore opportunities
          further away
        </p>
      </div>

      {/* Search and Category Filter section */}
      <div className="bg-card rounded-xl border border-border shadow-lg p-4 sm:p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search input for event title or description */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-input bg-muted text-foreground placeholder:text-muted-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Category dropdown for event type */}
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

      {/* Events Grid: Display filtered event cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Render each event card */}
        {filteredEvents.map((event) => {
          return (
            <div
              key={event.id}
              className="bg-card border border-border rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-2"
            >
              {/* Event image and category badge */}
              <div className="relative h-40 sm:h-48">
                <img
                  src={event.image_url || "/assets/placeholder.png"}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                      event.category
                    )}`}
                  >
                    {event.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <CheckCircle className="w-6 h-6 text-green-500 bg-white rounded-full" />
                </div>
              </div>

              {/* Event details and actions */}
              <div className="p-4 sm:p-6">
                {/* Event title and description */}
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {event.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>

                {/* Event info rows: date, time, location, attendees */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    {event.attendees || 0}/{event.max_attendees} attendees
                  </div>
                </div>

                {/* Organizer and Join/Leave button */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-foreground/70">
                    by {event.organizer || "Unknown"}
                  </div>
                  <Button
                    onClick={() => console.log(event.id)}
                    disabled={false}
                    variant={"default"}
                    className={`flex items-center gap-2 `}
                  >
                    <UserPlus className="w-4 h-4" />
                    {"Join"}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No events found message */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium text-foreground mb-2">
            No events found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find more events.
          </p>
        </div>
      )}
    </div>
  );
};

export default Events;
