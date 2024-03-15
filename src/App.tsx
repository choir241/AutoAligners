import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { Suspense, useEffect, useState } from "react";
import { AuthPaths, MainPaths } from "./Pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrivateRoutes, PublicRoutes } from "./middleware/variables/Routes";
import { useStore } from "./middleware/states/Zustand";
import { State } from "./middleware/states/Zustand-Types";
import { GetAppointmentData } from "./hooks/Appointment/GetAppointmentData";
import { Appointment } from "./middleware/variables/Interfaces";
import { AppointmentContext } from "./middleware/states/Context";

export default function App() {
  const emailCookie = useStore((state: State) => state.emailCookie);
  const [appointmentData, setAppointmentData] = useState<Appointment[]>([]);

  useEffect(() => {
    GetAppointmentData({
      setAppointmentData: (e: Appointment[]) => setAppointmentData(e),
    });
  }, []);

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <AppointmentContext.Provider value={{ appointmentData }}>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicRoutes emailCookie={emailCookie} />}>
              <Route path="/" element={<MainPaths.Home />} />
              <Route path="/demo" element={<AuthPaths.Demo />} />
              <Route path="/login" element={<AuthPaths.Login />} />
              <Route path="/admin-demo" element={<AuthPaths.Admin />} />
              <Route path="/reservation" element={<MainPaths.Reservation />} />
            </Route>
            <Route element={<PrivateRoutes emailCookie={emailCookie} />}>
              <Route path="/employee" element={<MainPaths.Employee />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer closeOnClick theme="dark" />
      </AppointmentContext.Provider>
    </Suspense>
  );
}
