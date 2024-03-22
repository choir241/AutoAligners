import { Calendar } from "./RenderApptCalendar";
import { useState, useContext } from "react";
import { AppointmentContext } from "../../../middleware/states/Context";
import { RenderAppointmentTimes } from "./RenderApptTimes";

export default function DisplayTimeAppointments() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const appointments = useContext(AppointmentContext).appointmentData;

  return (
    <section className="appointmentHub">
      <section className="calendarHub flex">
        {Calendar({
          setDate: (e: string) => setDate(e),
          appointments: appointments,
        })}
      </section>

      <section className="appointmentTimes flex">
        {RenderAppointmentTimes({
          selectedDate: date,
          appointments: appointments,
          setTime: (e: string) => setTime(e),
        })}
      </section>
    </section>
  );
}
