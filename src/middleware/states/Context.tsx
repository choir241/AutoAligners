import { createContext } from "react";
import { Appointment } from "../variables/Interfaces";

type Context = {
  appointmentData: Appointment[];
};

export const AppointmentContext = createContext<Context>({
  appointmentData: [],
});
