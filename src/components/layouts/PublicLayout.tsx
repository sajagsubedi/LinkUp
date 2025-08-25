import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import React from "react";

const PublicWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default PublicWrapper;
