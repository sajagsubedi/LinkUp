import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import React from "react";
import { Outlet } from "react-router-dom";

const LearnerLayout = () => {
  return (
    <>
      <Navbar />
      welcome learner
      <Outlet />
      <Footer />
    </>
  );
};

export default LearnerLayout;
