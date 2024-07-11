import { Route, Routes as Routes_ } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import Login from "../views/Auth/Login";
import Dashboard from "../views/Dashboard/Dashboard";

export const Routes: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return isAuthenticated ? <AuthenticatedRoutes /> : <NonAuthenticatedRoutes />;
};

function NonAuthenticatedRoutes() {
  return (
    <Routes_>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Login />} />
    </Routes_>
  );
}

function AuthenticatedRoutes() {
  return (
    <Routes_>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes_>
  );
}
