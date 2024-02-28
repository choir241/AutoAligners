import { getEmail } from "./Sessions";
import { Outlet } from "react-router";
import { Navigate } from "react-router";

export function PublicRoutes(emailCookie) {
  return emailCookie === "" || getEmail() === "" ? (
    <Outlet />
  ) : (
    <Navigate to="/employee" />
  );
}

export function PrivateRoutes(emailCookie) {
  return emailCookie === "" || getEmail() === "" ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
}
