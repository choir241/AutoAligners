import { lazy } from "react";

export const AuthPaths = {
  Demo: lazy(() => import("./pages/Authentication/Demo")),
  Admin: lazy(() => import("./pages/Authentication/Admin-Demo")),
  Login: lazy(() => import("./pages/Authentication/Login")),
};

export const MainPaths = {
  Home: lazy(() => import("./pages/Home")),
  Employee: lazy(() => import("./pages/Employee/Employee")),
};
