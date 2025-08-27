import React, { useEffect, useMemo, useState } from "react";
import {
  Users,
  MapPin,
  Globe,
  Search,
  Filter,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import ClubModal from "@/components/modals/ClubModal";
import { useContributorClubs } from "@/hooks/contributor/useContributorClubs";
import { useUploadImage } from "@/hooks/common/useImageUpload";

const categories = [
  "all",
  "Technology",
  "Arts",
  "Business",
  "Sports",
  "Science",
  "Social",
];

const ContributorClubsPage = () => {
  const { clubs, loading, addClub, updateClub, deleteClub } =
    useContributorClubs();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClub, setEditingClub] = useState(null);
  const [clubItems, setClubItems] = useState([]);
  const { uploadImage } = useUploadImage();

  useEffect(() => {
    // keep local UI state in sync; add isJoined default false
    setClubItems((prev) => {
      const byId = new Map(prev.map((c) => [c.id, c]));
      return (clubs || []).map((c) => ({
        ...c,
        isJoined: byId.get(c.id)?.isJoined ?? false,
        members: c.members ?? 0,
      }));
    });
  }, [clubs]);

  const filteredClubs = useMemo(() => {
    return clubItems.filter((club) => {
      const matchesSearch =
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || club.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [clubItems, searchTerm, categoryFilter]);

  const openCreate = () => {
    setEditingClub(null);
    setModalOpen(true);
  };

  const openEdit = (club) => {
    setEditingClub(club);
    setModalOpen(true);
  };

  const handleSave = async (formData) => {
    if (!editingClub) {
      let imageUrl = null;
      if (formData.image) {
        const data = await uploadImage(formData.image, "clubs");
        imageUrl = data?.publicUrl || null;
      }
      await addClub({
        ...formData,
        image_url: imageUrl,
      });
    } else {
      const newData = { ...formData };
      if (formData.image) {
        const data = await uploadImage(formData.image, "clubs");
        newData.image_url = data?.publicUrl || editingClub.image_url;
        console.log(data);
      }
      await updateClub(editingClub.id, newData);
    }
    setModalOpen(false);
    setEditingClub(null);
  };

  const getBadgeClass = () =>
    "bg-accent text-accent-foreground border border-border";

  return (
    <div className="min-h-[80vh] w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-8 bg-background">
      <div className="mb-8 flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Manage Clubs
          </h1>
          <p className="text-muted-foreground">
            Create, edit, and organize your community clubs
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" /> New Club
        </button>
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

      {loading ? (
        <div className="text-center py-12">Loading clubs...</div>
      ) : filteredClubs.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No clubs found. Try different filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredClubs.map((club) => (
            <Card
              key={club.id}
              className="bg-card border-border border overflow-hidden"
            >
              <div className="relative h-40 sm:h-48">
                {club.image_url ? (
                  <img
                    src={club.image_url}
                    alt={club.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeClass()}`}
                  >
                    {club.category}
                  </span>
                </div>
              </div>
              <CardHeader className="pb-0">
                <CardTitle className="text-foreground text-lg">
                  {club.name}
                </CardTitle>
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
                    {club.members || 0} members
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    by {club.creator}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="text-sm text-foreground/70">
                  {club.category}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(club)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border text-foreground hover:bg-accent"
                  >
                    <Pencil className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => deleteClub(club.id)}
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

      {/* Club Modal */}
      {modalOpen && (
        <ClubModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          onSave={handleSave}
          club={editingClub}
          onCancel={() => {
            setModalOpen(false);
            setEditingClub(null);
          }}
        />
      )}
    </div>
  );
};

export default ContributorClubsPage;
