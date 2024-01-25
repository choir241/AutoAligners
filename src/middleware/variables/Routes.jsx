import { getEmail } from "./Sessions";
import Home from "../pages/Home";
import Employee from "../pages/Employee";

export function HomeRoutes() {
  return getEmail ? <Employee /> : <Home />;
}
