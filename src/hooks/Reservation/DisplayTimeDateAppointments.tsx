import React, { useState } from "react";
import {
  Appointment,
  TimeDateAppointments,
} from "../../middleware/Interfaces/Reservation";
import {
  daysOfWeek,
  getMonth,
  getDay,
  getYear,
  getDayOfWeek,
} from "./DatesStatic";
import { calendarLogic } from "./DateLogic";
import CalendarCard from "./RenderCalendarCard";
import { militaryTimeConversion } from "./MilitaryTime";
import RenderTimeCard from "./RenderTimeCard";
import { CheckHolidays } from "./CheckHolidays";

export function DisplayTimeDateAppointments(
  props: TimeDateAppointments,
): React.JSX.Element {
  let month: number = getMonth();
  let day: number = getDay();
  let year: number = getYear();
  let week: number = getDayOfWeek();

  const [selectedDate, setSelectedDate] = useState<string>(
    `${month}/${day}/${year}`,
  );

  const calendar: React.JSX.Element[] = [];

  for (let i = 0; i < 8; i++) {
    let currentMonth = month;
    let currentDay = day;
    let currentYear = year;
    let currentDayOfWeek = week;

    const { newMonth, newDay, newYear } = calendarLogic({
      month: currentMonth,
      day: currentDay,
      year: currentYear,
    });

    day = newDay;
    month = newMonth;
    year = newYear;
    //have the current date as the default value
    //set a state called selectedDate and save the current date to its value
    //if a different date is selected, change the selected date as the current value of setSelectedDate
    //use the selectedDate value to show the different appointment times that are avaiable for the respective date
    const apptDate = props.date.toString().split("D")[0];

    if (currentDayOfWeek > 6) {
      currentDayOfWeek = 0;
      week = 0;
    }

    //if its the appt date
    if (apptDate === `${newMonth}/${newDay}/${newYear}`) {
      calendar.push(
        CalendarCard({
          i,
          currentMonth: newMonth,
          currentDay: newDay,
          currentYear: newYear,
          setSelectedDate,
          daysOfWeek,
          currentDayOfWeek,
          props,
          clickedClassName: "clicked",
        }),
      );
    } else if (
      !CheckHolidays({
        month: newMonth,
        day: newDay,
        dayOfWeek: currentDayOfWeek,
        year: newYear,
      })
    ) {
      calendar.push(
        CalendarCard({
          i,
          currentMonth: newMonth,
          currentDay: newDay,
          currentYear: newYear,
          setSelectedDate,
          daysOfWeek,
          currentDayOfWeek,
          props,
          clickedClassName: "",
        }),
      );
    } else if (
      CheckHolidays({
        month: newMonth,
        day: newDay,
        dayOfWeek: currentDayOfWeek,
        year: newYear,
      })
    ) {
      calendar.push(
        CalendarCard({
          i,
          currentMonth: newMonth,
          currentDay: newDay+1,
          currentYear: newYear,
          setSelectedDate,
          daysOfWeek,
          currentDayOfWeek,
          props,
          clickedClassName: "",
        }),
      );
    }

    day++;
    week++;
  }

  const appointmentTimes = props.appointments.filter(
    (appointment: Appointment) => appointment.$id === props.appointmentId,
  );

  if (appointmentTimes.length && props.edit) {
    let properTimeDisplay = [];

    //times at :00 mark
    for (let time = 7; time <= 18; time++) {
      const timeDisplay = time.toString() + ":00";
      if (!appointmentTimes[0].time.includes(timeDisplay)) {
        properTimeDisplay[time - 7] = timeDisplay;
      }else if(props.edit && appointmentTimes[0].time.includes(timeDisplay)){
        properTimeDisplay[time - 7] = timeDisplay;
      }
    }

    const miliaryTimes = militaryTimeConversion(properTimeDisplay);

    //render clear buttons of appointment dates
    const renderTimeButtons = miliaryTimes.map((time, i) => {
      if (props.time.toString() == time[1]) {
        return RenderTimeCard({ i, time, props, clickedClassName: "clicked" });
      } else {
        return RenderTimeCard({ i, time, props });
      }
    });

    return (
      <section className="flex items-center justify-around flex-col">
        <section className="calendarContainer grid mr-2">{calendar}</section>

        <section className="timeContainer grid">{renderTimeButtons}</section>
      </section>
    );
  }else if(!props.edit && !appointmentTimes.length){
    let properTimeDisplay = [];

    //times at :00 mark
    for (let time = 7; time <= 18; time++) {
      const timeDisplay = time.toString() + ":00";
      
      if(props.edit && props.appointments.time.includes(timeDisplay)){
        properTimeDisplay[time - 7] = timeDisplay;
      }

      properTimeDisplay[time - 7] = timeDisplay;

    }

    const miliaryTimes = militaryTimeConversion(properTimeDisplay);

    //render clear buttons of appointment dates
    const renderTimeButtons = miliaryTimes.map((time, i) => {
      if (props.time.toString() == time[1]) {
        return RenderTimeCard({ i, time, props, clickedClassName: "clicked" });
      } else {
        return RenderTimeCard({ i, time, props });
      }
    });

    return (
      <section className="flex items-center justify-around flex-col">
        <section className="calendarContainer grid mr-2">{calendar}</section>

        <section className="timeContainer grid">{renderTimeButtons}</section>
      </section>
    );
  }else{
    return(
      <section><h1>Loading...</h1></section>
    )
  }
}
