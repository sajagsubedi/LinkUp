import React, { useMemo, useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Plus,
  Pencil,
  Trash2,
  Filter,
  Search,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useContributorEvents } from "@/hooks/contributor/useContributorEvents";
import EventModal from "@/components/modals/EventModal";
import { useUploadImage } from "@/hooks/common/useImageUpload";

const categories = [
  "Career",
  "Workshop",
  "Education",
  "Competition",
  "Networking",
  "Conference",
];

const ContributorEventsPage = () => {
  const { events, loading, addEvent, updateEvent, deleteEvent } =
    useContributorEvents();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const { uploadImage } = useUploadImage();

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || event.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [events, searchTerm, categoryFilter]);

  const getCategoryBadge = () =>
    "bg-accent text-accent-foreground border border-border";

  const openCreate = () => {
    setEditingEvent(null);
    setModalOpen(true);
  };

  const openEdit = (evt) => {
    setEditingEvent(evt);
    setModalOpen(true);
  };

  const handleSave = async (formData) => {
    if (!editingEvent) {
      const data = await uploadImage(formData.image, "events");
      await addEvent({
        ...formData,
        image_url: data.publicUrl,
      });
    } else {
      const newData = { ...formData };
      if (formData.image !== undefined) {
        const data = await uploadImage(formData.image, "events");
        newData.image_url = data.publicUrl;
      }
      await updateEvent(editingEvent.id, {
        ...newData,
      });
    }
    setModalOpen(false);
    setEditingEvent(null);
  };

  return (
    <div className="min-h-[80vh] w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-8 bg-background">
      {/* Header */}
      <div className="mb-8 flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Manage Events
          </h1>
          <p className="text-muted-foreground">
            Create, edit, and organize your community events
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" /> New Event
        </button>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl border border-border shadow-lg p-4 sm:p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
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
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Events */}
      {loading ? (
        <div className="text-center py-12">Loading events...</div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium text-foreground mb-2">
            No events found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find more events.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="bg-card border-border border overflow-hidden"
            >
              <div className="relative h-40 sm:h-48">
                {event.image_url ? (
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryBadge(
                      event.category
                    )}`}
                  >
                    {event.category}
                  </span>
                </div>
              </div>
              <CardHeader className="pb-0">
                <CardTitle className="text-foreground text-lg">
                  {event.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground line-clamp-2">
                  {event.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
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
                    {event.attendees}/{event.max_attendees} attendees
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="text-sm text-foreground/70">
                  by {event.organizer || "Unknown"}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(event)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border text-foreground hover:bg-accent"
                  >
                    <Pencil className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-destructive/30 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Event Modal */}
      {modalOpen && (
        <EventModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          onSave={handleSave}
          event={editingEvent}
          onCancel={() => {
            setModalOpen(false);
            setEditingEvent(null);
          }}
        />
      )}
    </div>
  );
};

export default ContributorEventsPage;
