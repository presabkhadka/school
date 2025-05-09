import { Outlet, Navigate } from "react-router-dom";

let isAuthenticated = () => {
  return !!localStorage.getItem("Authorization");
};

export default function AdminAuthGuard() {
  return isAuthenticated() ? <Outlet /> : <Navigate to={"/admin/login"} />;
}
