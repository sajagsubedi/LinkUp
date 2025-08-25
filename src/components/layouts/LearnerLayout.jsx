import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Footer from "@/components/common/Footer";
import LearnerNavbar from "../common/LearnerNavbar";

const LearnerLayout = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { pathname } = useLocation();

  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    return <Navigate to="/?sign-in=true" />;
  }

  // Check onboarding status
  if (
    user !== undefined &&
    !user?.unsafeMetadata?.role &&
    pathname !== "/onboarding"
  ) {
    return <Navigate to="/dashboard" />;
  }

  if (user?.unsafeMetadata.role !== "learner") {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
      <LearnerNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default LearnerLayout;
