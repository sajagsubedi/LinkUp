import React, { useMemo, useState } from "react";
import { Calendar, MapPin, Users, Clock, Plus, Pencil, Trash2, X, Filter, Search } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const initialEvents = [
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
		organizer_id: "",
		attendees: 245,
		maxAttendees: 500,
		image_url:
			"https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=500",
	},
];

const categories = ["Career", "Workshop", "Education", "Competition", "Networking", "Conference"];

const emptyEvent = {
	id: "",
	title: "",
	description: "",
	date: "",
	time: "",
	location: "",
	category: "Career",
	organizer: "",
	organizer_id: "",
	attendees: 0,
	maxAttendees: 0,
	image_url: "",
};

const ContributorEventsPage = () => {
	const [events, setEvents] = useState(initialEvents);
	const [searchTerm, setSearchTerm] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [modalOpen, setModalOpen] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [formData, setFormData] = useState(emptyEvent);

	const filteredEvents = useMemo(() => {
		return events.filter((event) => {
			const matchesSearch =
				event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				event.description.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
			return matchesSearch && matchesCategory;
		});
	}, [events, searchTerm, categoryFilter]);

	const getCategoryBadge = () => "bg-accent text-accent-foreground border border-border";

	const openCreate = () => {
		setEditingId(null);
		setFormData({ ...emptyEvent, id: String(Date.now()) });
		setModalOpen(true);
	};

	const openEdit = (evt) => {
		setEditingId(evt.id);
		setFormData({ ...evt });
		setModalOpen(true);
	};

	const onDelete = (id) => {
		setEvents((prev) => prev.filter((e) => e.id !== id));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (editingId) {
			setEvents((prev) => prev.map((ev) => (ev.id === editingId ? { ...formData } : ev)));
		} else {
			setEvents((prev) => [{ ...formData }, ...prev]);
		}
		setModalOpen(false);
		setEditingId(null);
	};

	return (
		<div className="min-h-[80vh] w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-8 bg-background">
			<div className="mb-8 flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
				<div>
					<h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Manage Events</h1>
					<p className="text-muted-foreground">Create, edit, and organize your community events</p>
				</div>
				<button
					onClick={openCreate}
					className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
				>
					<Plus className="w-5 h-5" /> New Event
				</button>
			</div>

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
								<option key={c} value={c}>{c}</option>
							))}
						</select>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
				{filteredEvents.map((event) => (
					<Card key={event.id} className="bg-card border-border border overflow-hidden">
						<div className="relative h-40 sm:h-48">
							{event.image_url ? (
								<img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
							) : (
								<div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">No image</div>
							)}
							<div className="absolute top-4 left-4">
								<span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryBadge(event.category)}`}>
									{event.category}
								</span>
							</div>
						</div>
						<CardHeader className="pb-0">
							<CardTitle className="text-foreground text-lg">{event.title}</CardTitle>
							<CardDescription className="text-muted-foreground line-clamp-2">{event.description}</CardDescription>
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
									{event.attendees}/{event.maxAttendees} attendees
								</div>
							</div>
						</CardContent>
						<CardFooter className="flex items-center justify-between">
							<div className="text-sm text-foreground/70">by {event.organizer || "Unknown"}</div>
							<div className="flex items-center gap-2">
								<button
									onClick={() => openEdit(event)}
									className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border text-foreground hover:bg-accent"
								>
									<Pencil className="w-4 h-4" /> Edit
								</button>
								<button
									onClick={() => onDelete(event.id)}
									className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-destructive/30 text-destructive hover:bg-destructive/10"
								>
									<Trash2 className="w-4 h-4" /> Delete
								</button>
							</div>
						</CardFooter>
					</Card>
				))}
			</div>

			{filteredEvents.length === 0 && (
				<div className="text-center py-12">
					<Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
					<h3 className="text-xl font-medium text-foreground mb-2">No events found</h3>
					<p className="text-muted-foreground">Try adjusting your search or filters to find more events.</p>
				</div>
			)}

			{modalOpen && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
					<div className="w-full max-w-2xl bg-card border border-border rounded-xl shadow-xl">
						<div className="flex items-center justify-between px-6 py-4 border-b border-border">
							<h3 className="text-lg font-semibold text-foreground">{editingId ? "Edit Event" : "Create Event"}</h3>
							<button onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-foreground">
								<X className="w-5 h-5" />
							</button>
						</div>
						<form onSubmit={onSubmit} className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="md:col-span-2">
								<label className="block text-sm text-foreground mb-1">Title</label>
								<input
									required
									value={formData.title}
									onChange={(e) => setFormData({ ...formData, title: e.target.value })}
									className="w-full px-3 py-2 rounded-md bg-muted border border-input text-foreground focus:ring-2 focus:ring-primary"
								/>
							</div>
							<div className="md:col-span-2">
								<label className="block text-sm text-foreground mb-1">Description</label>
								<textarea
									required
									rows={4}
									value={formData.description}
									onChange={(e) => setFormData({ ...formData, description: e.target.value })}
									className="w-full px-3 py-2 rounded-md bg-muted border border-input text-foreground focus:ring-2 focus:ring-primary"
								/>
							</div>
							<div>
								<label className="block text-sm text-foreground mb-1">Date</label>
								<input
									required
									type="date"
									value={formData.date}
									onChange={(e) => setFormData({ ...formData, date: e.target.value })}
									className="w-full px-3 py-2 rounded-md bg-muted border border-input text-foreground focus:ring-2 focus:ring-primary"
								/>
							</div>
							<div>
								<label className="block text-sm text-foreground mb-1">Time</label>
								<input
									required
									type="text"
									placeholder="e.g., 10:00 AM - 4:00 PM"
									value={formData.time}
									onChange={(e) => setFormData({ ...formData, time: e.target.value })}
									className="w-full px-3 py-2 rounded-md bg-muted border border-input text-foreground focus:ring-2 focus:ring-primary"
								/>
							</div>
							<div className="md:col-span-2">
								<label className="block text-sm text-foreground mb-1">Location</label>
								<input
									required
									value={formData.location}
									onChange={(e) => setFormData({ ...formData, location: e.target.value })}
									className="w-full px-3 py-2 rounded-md bg-muted border border-input text-foreground focus:ring-2 focus:ring-primary"
								/>
							</div>
							<div>
								<label className="block text-sm text-foreground mb-1">Category</label>
								<select
									value={formData.category}
									onChange={(e) => setFormData({ ...formData, category: e.target.value })}
									className="w-full px-3 py-2 rounded-md bg-muted border border-input text-foreground focus:ring-2 focus:ring-primary"
								>
									{categories.map((c) => (
										<option key={c} value={c}>{c}</option>
									))}
								</select>
							</div>
							<div>
								<label className="block text-sm text-foreground mb-1">Organizer</label>
								<input
									value={formData.organizer}
									onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
									className="w-full px-3 py-2 rounded-md bg-muted border border-input text-foreground focus:ring-2 focus:ring-primary"
								/>
							</div>
							<div>
								<label className="block text-sm text-foreground mb-1">Max Attendees</label>
								<input
									type="number"
									min={0}
									value={formData.maxAttendees}
									onChange={(e) => setFormData({ ...formData, maxAttendees: Number(e.target.value) })}
									className="w-full px-3 py-2 rounded-md bg-muted border border-input text-foreground focus:ring-2 focus:ring-primary"
								/>
							</div>
							<div>
								<label className="block text-sm text-foreground mb-1">Image URL</label>
								<input
									value={formData.image_url}
									onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
									className="w-full px-3 py-2 rounded-md bg-muted border border-input text-foreground focus:ring-2 focus:ring-primary"
								/>
							</div>
							<div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
								<button
									type="button"
									onClick={() => setModalOpen(false)}
									className="px-4 py-2 rounded-md border border-border text-foreground hover:bg-accent"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="px-5 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
								>
									{editingId ? "Save Changes" : "Create Event"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default ContributorEventsPage;
