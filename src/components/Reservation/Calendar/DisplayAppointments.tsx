import { Calendar } from "./RenderApptCalendar";
import { useState, useContext } from "react";
import { AppointmentContext } from "../../../middleware/states/Context";
import { Appointment } from "../../../middleware/variables/Interfaces";

export default function DisplayTimeAppointments() {
  const [date, setDate] = useState("");
  const appointments = useContext(AppointmentContext);

  return (
    <section className="appointmentHub">
      <section className="calendarHub flex">
        {Calendar({
          setDate: (e: string) => setDate(e),
          appointments: appointments as unknown as Appointment[],
        })}
      </section>

      {/* <section className = "appointmentTimes flex">
                        {RenderAppointmentTimes({appointments: appointments as unknown as Appointment[], setTime: (e:string)=>setTime(e)})}
                    </section> */}
    </section>
  );
}
