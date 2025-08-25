import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Footer from "@/components/common/Footer";
import ContrubutorNavbar from "../common/ContributorNavbar";

const navLinks = [
  {
    name: "Dashboard",
    purposes: [
      "post-events",
      "post-mentorship",
      "post-internship",
      "post-club",
    ],
    path: "",
  },
  {
    name: "Events",
    purposes: ["post-events"],
    path: "events",
  },
  {
    name: "Internship",
    purposes: ["post-internship"],
    path: "internship",
  },
  {
    name: "Clubs",
    purposes: ["post-club"],
    path: "clubs",
  },
];

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

  if (user?.unsafeMetadata.role !== "contributor") {
    return <Navigate to="/dashboard" />;
  }

  const path = pathname.split("/contributor/dashboard/")[1];

  const filteredNavLinks = navLinks
    .map((value) => {
      if (value.purposes.includes(user?.unsafeMetadata.purpose)) {
        return value;
      }
    })
    .filter((v) => v != undefined);

  const allowedPath = filteredNavLinks.map((v) => v.path);

  //check whether the contributor is allowed to the path or not
  if (!allowedPath.includes(path) && path !== undefined) {
    console.log("Not included", path);
    return <Navigate to="/contributor/dashboard" />;
  }

  return (
    <>
      <ContrubutorNavbar navLinks={filteredNavLinks} />
      <Outlet />
      <Footer />
    </>
  );
};

export default ContributorLayout;
