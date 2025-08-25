import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Onboarding = () => {
  const { user, isLoaded } = useUser();

  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    await user
      .update({
        unsafeMetadata: { role },
      })
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("Error updating user metadata:", err);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate("/dashboard");
    }
  }, [user]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a ....
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          variant="blue"
          className="h-26 text-2xl"
          onClick={() => handleRoleSelection("learner")}
        >
          Learner
        </Button>
        <Button
          variant="destructive"
          className="h-26 text-2xl"
          onClick={() => handleRoleSelection("contributor")}
        >
          Contributor
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
