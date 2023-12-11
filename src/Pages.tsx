import { lazy } from "react";

export const Home = lazy(() => import("./pages/Home"));
export const Reservation = lazy(() => import("./pages/guest/Reservation"));
export const Demo = lazy(() => import("./pages/guest/Demo"));
export const ServiceEstimate = lazy(
  () => import("./pages/guest/ServiceEstimate"),
);
export const ManageAppointments = lazy(
  () => import("./pages/employee/ManageAppointments"),
);
export const EditAppointment = lazy(
  () => import("./pages/employee/EditAppointment"),
);
export const Employee = lazy(() => import("./pages/employee/Employee"));
export const Finance = lazy(() => import("./pages/guest/Finance"));
export const Client = lazy(() => import("./pages/employee/ClientFinance"));
export const EmployeeSettings = lazy(
  () => import("./pages/employee/EmployeeSettings"),
);
export const Inventory = lazy(() => import("./pages/employee/Inventory"));
export const InventoryShop = lazy(
  () => import("./pages/employee/InventoryShop"),
);
export const Cart = lazy(() => import("./pages/employee/Cart"));
export const Purchases = lazy(() => import("./pages/employee/Purchases"));
export const Estimates = lazy(() => import("./pages/employee/Estimates"));
export const AdminDemo = lazy(() => import("./pages/guest/AdminDemo"));

export const defaultUser = {
  $createdAt: "",
  $updatedAt: "",
  email: "",
  $id: "",
  name: "",
  phone: "",
  phoneVerification: true,
  emailVerification: true,
  passwordUpdate: "",
  status: true,
  prefs: [],
  registration: "",
};

export const defaultEmployee = {
  $id: "",
  fileName: "",
  image: "",
  position: "",
  PTO: "",
  salary: "",
  requestedPTO: "",
  requests: [],
};
