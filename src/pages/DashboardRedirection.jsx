import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
const DashboardRedirect = () => {
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
  )
    return <Navigate to="/onboarding" />;

  switch (user?.unsafeMetadata?.role) {
    case "learner":
      return <Navigate to="/learner/dashboard" replace />;
    case "contributor":
      return <Navigate to="/contributor/dashboard" replace />;
    case "admin":
      return <Navigate to="/admin/dashboard" replace />;
    default:
      return <Navigate to="/?sign-in=true" />;
  }
};

export default DashboardRedirect;
