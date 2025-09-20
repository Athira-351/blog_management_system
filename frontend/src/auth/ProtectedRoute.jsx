import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) {
    return user.role === "admin"
      ? <Navigate to="/admin-dashboard" />
      : <Navigate to="/user-dashboard" />;
  }

  return children;
};

export default ProtectedRoute;