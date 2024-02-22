import { getEmail } from "./Sessions";
import Home from "../../pages/Home";
import Employee from "../../pages/Employee/Employee";
import {useStore} from "../states/Zustand"
import { Outlet } from "react-router";
import { Navigate } from "react-router";

export default function HomeRoutes() {

  const emailCookie = useStore((state)=>state.emailCookie)

  return emailCookie || getEmail() ? <Employee /> : <Home />;
}

export function PublicRoutes(){
  return getEmail() === "" ? <Outlet/> : <Navigate to ="/"/>
}