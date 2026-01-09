import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const userRole = localStorage.getItem("role");
  const location = useLocation();

  // allow public pages
  if (
    location.pathname === "/login" ||
    location.pathname === "/signup"
  ) {
    return children;
  }

  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
