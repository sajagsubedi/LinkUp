import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  User,
  Calendar,
  Users,
  Briefcase,
  GraduationCap,
  BookOpen,
  Share2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState("role");
  const [selectedRole, setSelectedRole] = useState(null);

  const contributorPurposes = [
    {
      id: "post-events",
      label: "Post Events",
      icon: Calendar,
      description: "Share and organize community events",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      id: "post-club",
      label: "Post Club",
      icon: Users,
      description: "Create and manage club activities",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
    },
    {
      id: "provide-mentorship",
      label: "Provide Mentorship",
      icon: GraduationCap,
      description: "Guide and mentor other learners",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      iconColor: "text-purple-600",
    },
    {
      id: "post-internship",
      label: "Post Internship",
      icon: Briefcase,
      description: "Share internship opportunities",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      iconColor: "text-orange-600",
    },
  ];

  const handleRoleSelection = async (role) => {
    setSelectedRole(role);

    if (role === "learner") {
      // Learners go directly to dashboard without purpose selection
      await user
        ?.update({
          unsafeMetadata: { role },
        })
        .then(() => {
          navigate("/dashboard");
        })
        .catch((err) => {
          console.error("Error updating user metadata:", err);
        });
    } else {
      // Contributors proceed to purpose selection
      setCurrentStep("purpose");
    }
  };

  const handlePurposeSelection = async (purpose) => {
    if (!selectedRole) return;

    await user
      ?.update({
        unsafeMetadata: {
          role: selectedRole,
          purpose: purpose,
        },
      })
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("Error updating user metadata:", err);
      });
  };

  const handleBackToRole = () => {
    setCurrentStep("role");
    setSelectedRole(null);
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-background to-purple-50/50" />
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="max-w-5xl w-full relative z-10">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center ${
                  currentStep === "role" 
                    ? "bg-primary text-primary-foreground scale-110 shadow-lg" 
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {currentStep === "role" ? "1" : "✓"}
              </div>
              <span className={`ml-3 text-sm font-medium ${
                currentStep === "role" ? "text-foreground" : "text-muted-foreground"
              }`}>
                Choose Role
              </span>
            </div>
            
            {selectedRole === "contributor" && (
              <>
                <div className="w-16 h-px bg-border" />
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center ${
                      currentStep === "purpose"
                        ? "bg-primary text-primary-foreground scale-110 shadow-lg"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {currentStep === "purpose" ? "2" : "2"}
                  </div>
                  <span className={`ml-3 text-sm font-medium ${
                    currentStep === "purpose" ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    Choose Purpose
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Step 1: Role Selection */}
        {currentStep === "role" && (
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                Welcome to LinkUp!
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
                I am a...
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Choose your role to get started with your journey. You can always change this later.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => handleRoleSelection("learner")}
              >
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 p-8 h-64 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 border border-blue-200">
                  <div className="absolute inset-0 bg-white/10 group-hover:bg-white/5 transition-colors" />
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-white/30 transition-colors">
                      <BookOpen className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3">
                      Learner
                    </h3>
                    <p className="text-blue-100 text-base leading-relaxed">
                      Explore events, join clubs, find internships, and connect with mentors to grow your skills and network.
                    </p>
                  </div>
                  <div className="relative z-10 flex items-center justify-center text-white/90 group-hover:text-white transition-colors">
                    <span className="text-base font-semibold flex items-center gap-2">
                      Start Learning
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => handleRoleSelection("contributor")}
              >
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 to-pink-600 p-8 h-64 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-purple-500/25 border border-purple-200">
                  <div className="absolute inset-0 bg-white/10 group-hover:bg-white/5 transition-colors" />
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-white/30 transition-colors">
                      <Share2 className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3">
                      Contributor
                    </h3>
                    <p className="text-purple-100 text-base leading-relaxed">
                      Share opportunities, organize events, create clubs, and help others grow by contributing to the community.
                    </p>
                  </div>
                  <div className="relative z-10 flex items-center justify-center text-white/90 group-hover:text-white transition-colors">
                    <span className="text-base font-semibold flex items-center gap-2">
                      Start Contributing
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Purpose Selection (Only for Contributors) */}
        {currentStep === "purpose" && selectedRole === "contributor" && (
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={handleBackToRole}
              className="mb-8 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to role selection
            </Button>

            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                Almost there!
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                What would you like to contribute?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose your primary contribution focus. You can contribute in multiple areas later.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {contributorPurposes.map((purpose) => {
                const IconComponent = purpose.icon;
                return (
                  <div
                    key={purpose.id}
                    className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                    onClick={() => handlePurposeSelection(purpose.id)}
                  >
                    <div className={`relative overflow-hidden rounded-2xl border-2 h-full p-8 hover:shadow-xl transition-all duration-300 ${purpose.bgColor} ${purpose.borderColor} hover:border-primary/50`}>
                      <div className="flex flex-col h-full">
                        <div className={`w-16 h-16 ${purpose.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                          <IconComponent className={`w-8 h-8 ${purpose.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                            {purpose.label}
                          </h4>
                          <p className="text-muted-foreground text-base leading-relaxed mb-6">
                            {purpose.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Click to select
                          </span>
                          <div className="text-primary group-hover:translate-x-1 transition-transform">
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
