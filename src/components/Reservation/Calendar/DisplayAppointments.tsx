import { Calendar } from "./RenderApptCalendar";
import { useState, useContext } from "react";
import { AppointmentContext } from "../../../middleware/states/Context";
import { RenderAppointmentTimes } from "./RenderApptTimes";

interface DisplayTimeAppts {
  time: string;
  setTime: (e: string) => void;
  date: string;
  setDate: (e: string) => void;
}

export default function DisplayTimeAppointments(props: DisplayTimeAppts) {
  const appointments = useContext(AppointmentContext).appointmentData;

  return (
    <section className="appointmentHub">
      <section className="calendarHub flex">
        {Calendar({
          setDate: (e: string) => props.setDate(e),
          appointments: appointments,
        })}
      </section>

      <section className="appointmentTimes flex">
        {RenderAppointmentTimes({
          selectedDate: props.date,
          appointments: appointments,
          setTime: (e: string) => props.setTime(e),
        })}
      </section>
    </section>
  );
}
