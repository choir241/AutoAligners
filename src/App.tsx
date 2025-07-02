import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import {
  PrivateRoutes,
  PublicRoutes,
  PurchaseRoutes,
} from "./middleware/Routes.jsx";
import { Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EmployeeHub } from "./pages/employee/Employee.js";
import { APIContext, DarkModeContext } from "./middleware/Context";
import { cacheEmail } from "./middleware/Cache";
import { User } from "./middleware/Interfaces/Auth";
import { Profile } from "./middleware/Interfaces/General";
import { InventoryItem } from "./middleware/Interfaces/Inventory";
import { CartItem } from "./middleware/Interfaces/Cart";
import { Appointment } from "./middleware/Interfaces/Reservation";
import { PurchasedItem } from "./middleware/Interfaces/Purchases";
import {
  GetInventory,
  GetCart,
  GetAppointmentData,
  GetPurchases,
  GetAccount,
} from "./hooks/hooks/ApiCalls.js";
import {
  defaultEmployee,
  defaultUser,
  Home,
  Employee,
  Demo,
  Register,
  AdminDemo,
  Reservation,
  Cart,
  Inventory,
  InventoryShop,
  EmployeeSettings,
  ManageAppointments,
  Purchases,
  EditAppointment
} from "./Pages";
import { checkExpired } from "./hooks/ManageAppointments/DisplayAppointments.js";

export default function App() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [purchases, setPurchases] = useState<PurchasedItem[]>([]);
  const [user, setUser] = useState<User>(defaultUser);
  const [employee, setEmployee] = useState<Profile>(defaultEmployee);
  const [toggleDarkMode, setToggleDarkMode] = useState<string>("light");
  
  const sortedAppts = appointments.sort((a:any, b:any)=>{
    const aDate = new Date(a.date.split("D")[0]);
    const bDate = new Date(b.date.split("D")[0]);

    if ((aDate < bDate)) {
      return -1;
    } else {
      return 1;
    }
  })


  useEffect(() => {
      GetInventory((e: InventoryItem[]) => setInventory(e));
      GetCart((e: CartItem[]) => setCart(e));
      GetAppointmentData((e: Appointment[]) => setAppointments(e));
      GetPurchases((e: PurchasedItem[]) => setPurchases(e));
      GetAccount((e: User) => setUser(e));
  }, []);

  return (
    <DarkModeContext.Provider value={{setToggleDarkMode, toggleDarkMode}}>
    <APIContext.Provider
      value={{
        inventory,
        cart,
        appointments: sortedAppts,
        setAppointments,
        purchases,
        user,
        employee,
      }}
    >
      <Suspense fallback={<h1>Loading...</h1>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<PublicRoutes />}>
              <Route path="/register" element={<Register/>} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/login" element={<EmployeeHub />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/adminDemo" element={<AdminDemo />} />
              <Route path="/reservation" element={<Reservation />} />
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route path="/editAppointment" element={<EditAppointment/>} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/inventoryShop" element={<InventoryShop />} />
              <Route path="/settings" element={<EmployeeSettings />} />
              <Route
                path="/manageAppointments"
                element={<ManageAppointments />}
              />
              <Route element={<PurchaseRoutes />}>
                <Route path="/purchases" element={<Purchases />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </Suspense>
    </APIContext.Provider>
    </DarkModeContext.Provider>
  );
}
