import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface AuthRouteProps {
  element: ReactNode;
}

const AuthRoute = ({ element }: AuthRouteProps) => {
  const token = localStorage.getItem("admin_token");

  return token ? <>{element}</> : <Navigate to="/admin-lg" />;
};

export default AuthRoute;