import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LearnerLayout = ({ children }: { children: React.ReactNode }) => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  if (!authState.session || authState.user?.account_type !== "learner") {
    navigate("/");
  }
  return (
    <>
      <Navbar />
      welcome learner
      {children}
      <Footer />
    </>
  );
};

export default LearnerLayout;
