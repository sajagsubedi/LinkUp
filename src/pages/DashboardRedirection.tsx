import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const DashboardRedirect = () => {
  const { authState } = useAuth();
  const { loading, session, user } = authState;

  if (loading) return <div>Loading...</div>;
  if (!session) return <Navigate to="/login" replace />;

  switch (user?.account_type) {
    case "learner":
      return <Navigate to="/learner/dashboard" replace />;
    case "contributor":
      return <Navigate to="/contributor/dashboard" replace />;
    case "admin":
      return <Navigate to="/admin/dashboard" replace />;
    default:
      return <Navigate to="/login" replace />; // fallback
  }
};

export default DashboardRedirect;
