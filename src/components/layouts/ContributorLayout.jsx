import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const ContributorLayout = () => {
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

  if (!user?.unsafeMetadata.role == "contributor") {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default ContributorLayout;
