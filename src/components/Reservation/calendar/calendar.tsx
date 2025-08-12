import { getMonth, getDay, getYear, getDayOfWeek } from "../../../api/dates";
import { calendarLogic } from "./calendarLogic";
import { isHoliday } from "./isHoliday";

export interface IAptDay {
  month: number;
  day: number;
  year: number;
  dayOfWeek: number;
}

export function calendar() {
  let currMonth = getMonth();
  let currDay = getDay();
  let currYear = getYear();
  let currDayOfWeek: number = getDayOfWeek();

  const calendar: IAptDay[] = [
    {
      month: currMonth,
      day: currDay,
      year: currYear,
      dayOfWeek: currDayOfWeek,
    },
  ];

  for (let i = 0; i < 58; i++) {
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
      isHoliday({ month: currMonth, day: currDay, dayOfWeek: currDayOfWeek }) &&
      currDayOfWeek !== 0 &&
      currDayOfWeek !== 6
    ) {
      calendar.push({
        month: currMonth,
        day: currDay,
        year: currYear,
        dayOfWeek: currDayOfWeek,
      });
    }
  }
  return calendar;
}
