import {lazy} from "react"

export const Home = lazy(()=>import("./pages/Home.tsx"));
export const Reservation = lazy(()=>import("./pages/guest/Reservation.tsx"));
export const Demo = lazy(()=>import("./pages/guest/Demo"));
export const ServiceEstimate = lazy(()=>import("./pages/guest/ServiceEstimate.tsx"));
export const ManageAppointments = lazy(()=>import("./pages/employee/ManageAppointments.tsx"));
export const EditAppointment = lazy(()=>import("./pages/employee/EditAppointment.tsx"));
export const Employee = lazy(()=>import("./pages/employee/Employee.tsx"));
export const Finance = lazy(()=>import("./pages/guest/Finance.tsx"));
export const Client = lazy(()=> import("./pages/employee/ClientFinance.tsx"));
export const EmployeeSettings = lazy(()=>import("./pages/employee/EmployeeSettings.tsx"));
export const Inventory = lazy(()=>import("./pages/employee/Inventory.tsx"));
export const InventoryShop = lazy(()=>import("./pages/employee/InventoryShop.tsx"));
export const Cart = lazy(()=>import("./pages/employee/Cart"));
export const Purchases = lazy(()=>import("./pages/employee/Purchases"));
export const Estimates = lazy(()=>import("./pages/employee/Estimates"));
export const AdminDemo = lazy(()=>import("./pages/guest/AdminDemo"));

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
    registration: ""
    }

export const defaultEmployee = {
    $id: "",
    fileName: "",
    image: "",
    position: "",
    PTO: "",
    salary: "",
    requestedPTO: "",
    requests: []
}