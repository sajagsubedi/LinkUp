import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authState } = useAuth();

  if (!authState.session) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
