import React, { useState } from "react";
import { Calendar, MapPin, Users, Clock, Filter, Search } from "lucide-react";

// EventsPage.jsx - Learner view for discovering events
// Now uses design tokens and light theme
const Events = () => {
  // State for search input
  const [searchTerm, setSearchTerm] = useState("");
  // State for category filter
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Mock data for events (replace with API data in production)
  const mockEvents = [
    {
      id: "1",
      title: "Tech Career Fair 2024",
      description:
        "Meet top tech companies and explore career opportunities in software development, data science, and more.",
      date: "2024-01-15",
      time: "10:00 AM - 4:00 PM",
      location: "Convention Center, Downtown",
      category: "Career",
      organizer: "Tech Alliance",
      attendees: 245,
      maxAttendees: 500,
      imageUrl:
        "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      id: "2",
      title: "AI Workshop for Beginners",
      description:
        "Learn the fundamentals of artificial intelligence and machine learning in this hands-on workshop.",
      date: "2024-01-18",
      time: "2:00 PM - 5:00 PM",
      location: "University Campus, Building A",
      category: "Workshop",
      organizer: "AI Society",
      attendees: 89,
      maxAttendees: 120,
      imageUrl:
        "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      id: "3",
      title: "Study Abroad Information Session",
      description:
        "Get detailed information about study abroad programs, scholarships, and application processes.",
      date: "2024-01-20",
      time: "6:00 PM - 8:00 PM",
      location: "Student Union Hall",
      category: "Education",
      organizer: "International Office",
      attendees: 156,
      maxAttendees: 200,
      imageUrl:
        "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      id: "4",
      title: "Startup Pitch Competition",
      description:
        "Watch innovative startup ideas compete for funding and mentorship opportunities.",
      date: "2024-01-22",
      time: "1:00 PM - 6:00 PM",
      location: "Business Incubator Center",
      category: "Competition",
      organizer: "Entrepreneurship Club",
      attendees: 78,
      maxAttendees: 150,
      imageUrl:
        "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      id: "5",
      title: "Networking Mixer - Young Professionals",
      description:
        "Connect with young professionals across various industries and expand your network.",
      date: "2024-01-25",
      time: "7:00 PM - 10:00 PM",
      location: "Downtown Hotel Ballroom",
      category: "Networking",
      organizer: "Young Professionals Network",
      attendees: 203,
      maxAttendees: 300,
      imageUrl:
        "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
    {
      id: "6",
      title: "Environmental Sustainability Summit",
      description:
        "Learn about climate change solutions and sustainable practices from industry experts.",
      date: "2024-01-28",
      time: "9:00 AM - 5:00 PM",
      location: "Green Conference Center",
      category: "Conference",
      organizer: "Environmental Society",
      attendees: 134,
      maxAttendees: 250,
      imageUrl:
        "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=500",
    },
  ];

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

  // Filter events based on search and selected category
  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Category badge color using tokens
  const getCategoryColor = () => "bg-accent text-accent-foreground";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {/* Render each event card */}
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-card border border-border rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-2"
          >
            {/* Event image and category badge */}
            <div className="relative h-40 sm:h-48">
              <img
                src={event.imageUrl}
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
                  {event.date}
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
                  {event.attendees}/{event.maxAttendees} attendees
                </div>
              </div>

              {/* Organizer and Join button */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-foreground/70">
                  by {event.organizer}
                </div>
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        ))}
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
