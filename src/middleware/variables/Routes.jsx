import { getEmail } from "./Sessions";
import { Outlet } from "react-router";
import { Navigate } from "react-router";

export function PublicRoutes(emailCookie) {
  return emailCookie.emailCookie === "" || getEmail() === null ? (
    <Outlet />
  ) : (
    <Navigate to="/employee" />
  );
}

export function PrivateRoutes(emailCookie) {
  return emailCookie.emailCookie === "" || getEmail() === null ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
}
