import React, { useState } from "react";
// import {
//   Appointment,
//   TimeDateAppointments,
// } from "../../middleware/Interfaces/Reservation";
import {
  daysOfWeek,
  getMonth,
  getDay,
  getYear,
  getDayOfWeek,
} from "../../api/dates";
import { calendarLogic } from "./calendarLogic";
import { isHoliday } from "./isHoliday";
// import CalendarCard from "./RenderCalendarCard";
// import { militaryTimeConversion } from "./MilitaryTime";
// import RenderTimeCard from "./RenderTimeCard";

export interface IAptTimeAndDay {
  month: number;
  day: number;
  year: number;
  dayOfWeek: number;
}

export function DisplayTimeDateAppointments() {
  const [aptTime, setAptTime] = useState();
  const [aptDate, setAptDate] = useState();

  const dayOfWeeks = daysOfWeek;
  let currMonth = getMonth();
  let currDay = getDay();
  let currYear = getYear();
  let currDayOfWeek:number = getDayOfWeek();

  const calendar: IAptTimeAndDay[] = [
    {
      month: currMonth,
      day: currDay,
      year: currYear,
      dayOfWeek: currDayOfWeek,
    },
  ];

  for (let i = 0; i < 10; i++) {
    const { newDay, newDayOfWeek, newMonth, newYear } = calendarLogic({
      currDay,
      currDayOfWeek,
      currMonth,
      currYear,
      calendar,
    });
    currMonth = newMonth;
    currDay = newDay;
    currDayOfWeek = newDayOfWeek;
    currYear = newYear;
    if (
      isHoliday({ month: currMonth, day: currDay, dayOfWeek: currDayOfWeek }) && (currDayOfWeek !== 0) &&(currDayOfWeek !== 6)
    ) {
      calendar.push({
        month: currMonth,
        day: currDay,
        year: currYear,
        dayOfWeek: currDayOfWeek,
      });
    }
  }
  console.log(calendar);
}
