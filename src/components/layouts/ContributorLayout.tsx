import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ContributorLayout = ({ children }: { children: React.ReactNode }) => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  if (!authState.session || authState.user?.account_type !== "contributor") {
    navigate("/");
  }
  return (
    <>
      <Navbar />
      welcome contributor
      {children}
      <Footer />
    </>
  );
};

export default ContributorLayout;
