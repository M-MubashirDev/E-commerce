import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRoute({ children }) {
  const { userAdmin, accessToken } = useSelector((state) => state.adminAuth);

  if (!userAdmin || !accessToken) {
    return <Navigate to="/login?role=admin" replace />;
  }

  return <>{children}</>;
}
