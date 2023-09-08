import { Navigate, Outlet } from "react-router-dom";
import AuthUser from '../components/AuthUser';

export default function ProtectedRoutes() {
  const {token} = AuthUser();

  return token !== null ? <Outlet /> : <Navigate to="/" />;
}