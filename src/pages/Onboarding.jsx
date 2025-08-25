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
    },
    {
      id: "post-club",
      label: "Post Club",
      icon: Users,
      description: "Create and manage club activities",
    },
    {
      id: "provide-mentorship",
      label: "Provide Mentorship",
      icon: GraduationCap,
      description: "Guide and mentor other learners",
    },
    {
      id: "post-internship",
      label: "Post Internship",
      icon: Briefcase,
      description: "Share internship opportunities",
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
      <div className="flex flex-col items-center justify-center mt-32">
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-12">
          <div
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              currentStep === "role" ? "bg-primary scale-125" : "bg-primary/40"
            }`}
          />
          {selectedRole === "contributor" && (
            <>
              <div className="w-20 h-1 bg-gray-300 mx-4" />
              <div
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  currentStep === "purpose"
                    ? "bg-primary scale-125"
                    : "bg-primary/40"
                }`}
              />
            </>
          )}
        </div>

        {/* Step 1: Role Selection */}
        {currentStep === "role" && (
          <div className="text-center">
            <h2 className="gradient-title font-extrabold text-6xl sm:text-7xl md:text-8xl tracking-tighter mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              I am a...
            </h2>
            <p className="text-xl text-gray-600 mb-16">
              Choose your role to get started
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => handleRoleSelection("learner")}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 p-8 h-56 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-blue-500/25">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                  <div className="relative z-10">
                    <BookOpen className="w-16 h-16 text-white mb-4 mx-auto" />
                    <h3 className="text-3xl font-bold text-white mb-2">
                      Learner
                    </h3>
                    <p className="text-blue-100 text-sm">
                      Explore and discover new opportunities
                    </p>
                  </div>
                  <div className="relative z-10 flex items-center justify-center text-white/80 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">
                      Start Learning →
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => handleRoleSelection("contributor")}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 p-8 h-56 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-purple-500/25">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                  <div className="relative z-10">
                    <Share2 className="w-16 h-16 text-white mb-4 mx-auto" />
                    <h3 className="text-3xl font-bold text-white mb-2">
                      Contributor
                    </h3>
                    <p className="text-purple-100 text-sm">
                      Share opportunities and help others
                    </p>
                  </div>
                  <div className="relative z-10 flex items-center justify-center text-white/80 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">
                      Start Contributing →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Purpose Selection (Only for Contributors) */}
        {currentStep === "purpose" && selectedRole === "contributor" && (
          <div className="max-w-3xl mx-auto">
            <Button
            variant="none"
              onClick={handleBackToRole}
              className="mb-8 text-gray-600 hover:text-gray-400 outline-none"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to role selection
            </Button>

            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                What would you like to contribute?
              </h2>
              <p className="text-xl text-gray-600">
                Choose your primary contribution focus
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {contributorPurposes.map((purpose) => {
                const IconComponent = purpose.icon;
                return (
                  <div
                    key={purpose.id}
                    className="group cursor-pointer transform transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center"
                    onClick={() => handlePurposeSelection(purpose.id)}
                  >
                    <div className="relative overflow-hidden rounded-xl bg-gray-950 border-2 h-full border-gray-900 p-6 hover:border-primary hover:shadow-lg transition-all">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 rounded-lg bg-gray-900 text-primary group-hover:from-gray-900 group-hover:to-gray-800 group-hover:bg-gradient-to-br transition-colors">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                            {purpose.label}
                          </h4>
                          <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                            {purpose.description}
                          </p>
                        </div>
                        <div className="text-gray-400 group-hover:text-accent transition-colors">
                          →
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
