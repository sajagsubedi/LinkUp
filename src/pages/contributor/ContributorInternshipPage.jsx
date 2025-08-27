import React, { useMemo, useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  Building,
  Plus,
  Pencil,
  Trash2,
  Filter,
  Search,
  Calendar,
  DollarSign,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useContributorInternships } from "@/hooks/contributor/useContributorInternships";
import InternshipModal from "@/components/modals/InternshipModal";
import { useUploadImage } from "@/hooks/common/useImageUpload";
import { format } from "date-fns";

const internshipTypes = ["remote", "onsite", "hybrid"];

const ContributorInternshipPage = () => {
  const { internships, loading, addInternship, updateInternship, deleteInternship } =
    useContributorInternships();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInternship, setEditingInternship] = useState(null);
  const { uploadImage } = useUploadImage();

  const filteredInternships = useMemo(() => {
    return internships.filter((internship) => {
      const matchesSearch =
        internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        typeFilter === "all" || internship.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [internships, searchTerm, typeFilter]);

  const getTypeColor = (type) => {
    switch (type) {
      case "remote":
        return "bg-blue-100 text-blue-800";
      case "onsite":
        return "bg-green-100 text-green-800";
      case "hybrid":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const openCreate = () => {
    setEditingInternship(null);
    setModalOpen(true);
  };

  const openEdit = (internship) => {
    setEditingInternship(internship);
    setModalOpen(true);
  };

  const handleSave = async (formData) => {
    if (!editingInternship) {
      // Creating new internship
      let imageUrl = null;
      if (formData.image) {
        const data = await uploadImage(formData.image, "internships");
        imageUrl = data.publicUrl;
      }
      
      await addInternship({
        ...formData,
        image_url: imageUrl,
      });
    } else {
      // Updating existing internship
      const newData = { ...formData };
      if (formData.image) {
        const data = await uploadImage(formData.image, "internships");
        newData.image_url = data.publicUrl;
      }
      await updateInternship(editingInternship.id, newData);
    }
    setModalOpen(false);
    setEditingInternship(null);
  };

  return (
    <div className="min-h-[80vh] w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-8 bg-background">
      {/* Header */}
      <div className="mb-8 flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Manage Internships
          </h1>
          <p className="text-muted-foreground">
            Create, edit, and organize your internship opportunities
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" /> New Internship
        </button>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl border border-border shadow-lg p-4 sm:p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search internships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-input bg-muted text-foreground placeholder:text-muted-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-input bg-muted text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Types</option>
              {internshipTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Internships */}
      {loading ? (
        <div className="text-center py-12">Loading internships...</div>
      ) : filteredInternships.length === 0 ? (
        <div className="text-center py-12">
          <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium text-foreground mb-2">
            No internships found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters, or create your first internship opportunity.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredInternships.map((internship) => {
            const daysRemaining = getDaysRemaining(internship.deadline);
            return (
              <Card
                key={internship.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {internship.image_url ? (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={internship.image_url}
                      alt={internship.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-32 bg-muted flex items-center justify-center">
                    <Briefcase className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{internship.title}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Building className="w-4 h-4 mr-1" />
                        {internship.company}
                      </CardDescription>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                        internship.type
                      )}`}
                    >
                      {internship.type}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {internship.description}
                  </p>
                  
                  {/* Requirements */}
                  {internship.requirements && internship.requirements.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-foreground mb-2">
                        Requirements:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {internship.requirements.slice(0, 3).map((req, index) => (
                          <span
                            key={index}
                            className="bg-muted text-foreground px-2 py-0.5 rounded-full text-xs border border-border"
                          >
                            {req}
                          </span>
                        ))}
                        {internship.requirements.length > 3 && (
                          <span className="bg-muted text-foreground px-2 py-0.5 rounded-full text-xs border border-border">
                            +{internship.requirements.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-3 h-3 mr-1" />
                      {internship.location}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {internship.duration}
                    </div>
                    {internship.stipend && (
                      <div className="flex items-center text-muted-foreground">
                        <DollarSign className="w-3 h-3 mr-1" />
                        {internship.stipend}
                      </div>
                    )}
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="w-3 h-3 mr-1" />
                      Deadline: {formatDate(internship.deadline)}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="w-3 h-3 mr-1" />
                      {internship.applicants || 0} applicants
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between pt-4">
                  <div>
                    {daysRemaining > 0 ? (
                      <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                        {daysRemaining} days left
                      </span>
                    ) : (
                      <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-full">
                        Expired
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(internship)}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-border text-foreground hover:bg-accent text-xs"
                    >
                      <Pencil className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() => deleteInternship(internship.id)}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-destructive/30 text-destructive hover:bg-destructive/10 text-xs"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      {/* Internship Modal */}
      {modalOpen && (
        <InternshipModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          onSave={handleSave}
          internship={editingInternship}
          onCancel={() => {
            setModalOpen(false);
            setEditingInternship(null);
          }}
        />
      )}
    </div>
  );
};

export default ContributorInternshipPage;