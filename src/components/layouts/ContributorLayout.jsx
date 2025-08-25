import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import React from "react";
import { Outlet } from "react-router-dom";

const ContributorLayout = () => {
  return (
    <>
      <Navbar />
      welcome contributor
      <Footer />
    </>
  );
};

export default ContributorLayout;
