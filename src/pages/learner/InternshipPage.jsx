import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Search,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Building,
  Users,
  AlertCircle,
} from "lucide-react";
import { useLearnerInternships } from "@/hooks/learner/useLearnerInternships";

import { useToast } from "@/components/ui/use-toast";

// InternshipPage.jsx - Learner view for discovering internships
const Internships = () => {
  // State for search input and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const { toast } = useToast();

  // Use the custom hook to fetch internships and handle applications
  const {
    internships,
    loading,
    error,
    applyForInternship,
    hasApplied,
    getUserApplications,
  } = useLearnerInternships();

  // State to track which internships the user has applied to
  const [userApplications, setUserApplications] = useState([]);
  const [applicationLoading, setApplicationLoading] = useState({});

  // Fetch user's applications on component mount
  useEffect(() => {
    const fetchUserApplications = async () => {
      try {
        const applications = await getUserApplications();
        setUserApplications(applications.map(app => app.internship_id));
      } catch (error) {
        console.error("Error fetching user applications:", error);
      }
    };

    fetchUserApplications();
  }, [getUserApplications]);

  // Type filter options for dropdown
  const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "remote", label: "Remote" },
    { value: "onsite", label: "On-site" },
    { value: "hybrid", label: "Hybrid" },
  ];

  // Get unique locations from internships for the location filter
  const uniqueLocations = [...new Set(internships.map(item => item.location))];
  const locationOptions = [
    { value: "all", label: "All Locations" },
    ...uniqueLocations.map(location => ({
      value: location,
      label: location,
    })),
  ];

  // Filter internships by search term, type, and location
  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "all" || internship.type === typeFilter;
    const matchesLocation =
      locationFilter === "all" || internship.location === locationFilter;

    return matchesSearch && matchesType && matchesLocation;
  });

  // Token-based badge colors
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

  // Returns emoji icon for each internship type
  const getTypeIcon = (type) => {
    switch (type) {
      case "remote":
        return "🏠";
      case "onsite":
        return "🏢";
      case "hybrid":
        return "🔄";
      default:
        return "📍";
    }
  };

  // Formats a date string to a readable format
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const d = new Date(dateString);
      return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    } catch (error) {
      return dateString;
    }
  };

  // Calculates days remaining until internship application deadline
  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Handle apply button click
  const handleApply = async (internshipId) => {
    setApplicationLoading(prev => ({ ...prev, [internshipId]: true }));
    try {
      await applyForInternship(internshipId);
      setUserApplications(prev => [...prev, internshipId]);
      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted.",
      });
    } catch (error) {
      toast({
        title: "Application Failed",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setApplicationLoading(prev => ({ ...prev, [internshipId]: false }));
    }
  };

  // Check if user has applied to a specific internship
  const hasUserApplied = (internshipId) => {
    return userApplications.includes(internshipId);
  };

  return (
    <div className="min-h-[80vh] w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-8 bg-background">
      {/* Header section: Title and description */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Find Internships
        </h1>
        <p className="text-muted-foreground">
          Discover internship opportunities that match your skills and career
          goals
        </p>
      </div>

      {/* Search and Filters section */}
      <div className="bg-card rounded-xl border border-border shadow-lg p-4 sm:p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search input for internship title, company, or description */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search internships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-input bg-muted text-foreground rounded-lg placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Type Filter dropdown */}
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-input bg-muted text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter dropdown */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-input bg-muted text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {locationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>Failed to load internships. Please try again later.</span>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading internships...</p>
        </div>
      )}

      {/* Internships List: Display filtered internship cards */}
      {!loading && !error && (
        <div className="space-y-4 sm:space-y-6">
          {/* Render each internship card */}
          {filteredInternships.map((internship) => {
            const daysRemaining = getDaysRemaining(internship.deadline);
            const isApplied = hasUserApplied(internship.id);
            const isLoading = applicationLoading[internship.id];
            const isExpired = daysRemaining <= 0;
            
            return (
              <div
                key={internship.id}
                className="bg-card border border-border rounded-xl shadow p-4 sm:p-6 hover:shadow-lg transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    {/* Internship card header: title, company, location, type, deadline */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {internship.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 mb-3">
                          <div className="flex items-center text-muted-foreground">
                            <Building className="w-4 h-4 mr-1" />
                            {internship.company}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-1" />
                            {internship.location}
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
                              internship.type
                            )}`}
                          >
                            {getTypeIcon(internship.type)} {internship.type}
                          </span>
                        </div>
                      </div>
                      {daysRemaining > 0 ? (
                        <div className="text-right">
                          <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                            {daysRemaining} days left
                          </div>
                        </div>
                      ) : (
                        <div className="bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm font-medium">
                          Expired
                        </div>
                      )}
                    </div>

                    {/* Internship description */}
                    <p className="text-muted-foreground mb-4">
                      {internship.description}
                    </p>

                    {/* Requirements list */}
                    {internship.requirements && internship.requirements.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">
                          Requirements:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {internship.requirements.map((req, index) => (
                            <span
                              key={index}
                              className="bg-muted text-foreground px-2 py-1 rounded-full text-sm border border-border"
                            >
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Details Grid: duration, posted date, applicants */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{internship.duration}</span>
                      </div>
                      {internship.stipend && (
                        <div className="flex items-center text-muted-foreground">
                          <DollarSign className="w-4 h-4 mr-1" />
                          <span>{internship.stipend}</span>
                        </div>
                      )}
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Posted {formatDate(internship.created_at)}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{internship.applicants || 0} applicants</span>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons: Apply Now or Application Closed */}
                  <div className="lg:ml-6 lg:w-48">
                    <div className="space-y-2">
                      <button
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${isApplied
                          ? "bg-accent text-accent-foreground cursor-not-allowed"
                          : isExpired
                            ? "bg-muted text-muted-foreground cursor-not-allowed"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }`}
                        disabled={isApplied || isExpired || isLoading}
                        onClick={() => !isApplied && !isExpired && handleApply(internship.id)}
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center">
                            <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></span>
                            Applying...
                          </span>
                        ) : isApplied ? (
                          "Applied"
                        ) : isExpired ? (
                          "Application Closed"
                        ) : (
                          "Apply Now"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* No internships found message */}
      {!loading && !error && filteredInternships.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium text-foreground mb-2">
            No internships found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find more opportunities.
          </p>
        </div>
      )}
    </div>
  );
};

export default Internships;
