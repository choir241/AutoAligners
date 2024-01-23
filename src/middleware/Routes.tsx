// import { Outlet, Navigate } from "react-router-dom";
import { getEmail } from "./Sessions";
import Home from "../pages/Home";
import { Employee } from "../Pages";

export function HomeRoutes() {
  return getEmail ? <Employee /> : <Home />;
}
