import {
  Appointment,
  ApptTimeInterface,
  ChangeTime,
} from "../../../middleware/variables/Interfaces";
import { useState } from "react";

function handleChangeTime(props: ChangeTime) {
  props.e.preventDefault();

  document.querySelectorAll(".time").forEach((ele) => {
    ele.classList.remove("clicked");
  });

  document.querySelector(`.t-${props.i}`)?.classList.add("clicked");
}

export function RenderAppointmentTimes(props: ApptTimeInterface) {
  const filterAppointmentTimes = props.appointments.filter(
    (appointment: Appointment) =>
      appointment.date.split("D")[0] === props.selectedDate,
  );

  const appointmentTimes = filterAppointmentTimes.map(
    (appointment: Appointment) => appointment.time,
  );

  let timeSlots = [];

  //times at :00 mark
  for (let time = 7; time <= 17; time++) {
    const timeDisplay = time.toString() + ":00";
    if (!appointmentTimes.includes(timeDisplay)) {
      timeSlots[time - 7] = timeDisplay;
    }
  }

  const miliaryTimeConversion = timeSlots.map((time: string) => {
    const hours = parseInt(time.split(":")[0]);

    if (parseInt(time) > 12) {
      //data structure of 1:00PM, 13:00
      return [(hours - 12).toString() + ":00PM", time];
    } else if (parseInt(time) === 12) {
      //data structure of 12:00PM, 12:00
      return [hours + ":00PM", time];
    } else {
      //data structure of 1:00AM, 1:00
      return [hours + ":00AM", time];
    }
  });

  //render clear buttons of appointment dates
  return miliaryTimeConversion.map((time, i) => {
    if (time[1] === props.time) {
      return (
        <button
          className={`clearButton t-${i} time clicked`}
          key={i}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            props.setTime(time[0]);
            handleChangeTime({
              i: i,
              e: e,
              time: time[1],
            });
          }}
        >
          {time[0]}
        </button>
      );
    } else {
      return (
        <button
          className={`clearButton t-${i} time`}
          key={i}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            props.setTime(time[0]);
            handleChangeTime({
              i: i,
              e: e,
              time: time[1],
            });
          }}
        >
          {time[0]}
        </button>
      );
    }
  });
}
