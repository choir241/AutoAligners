import { lazy } from "react";

const Home = lazy(() => import("./home/Home"));

export const Pages = {
  Home,
};
