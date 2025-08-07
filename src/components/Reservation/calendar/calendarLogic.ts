import { type IAptDay } from "./calendar";

function isLeapYear(year: number) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true;
  }
  return false;
}

export function calendarLogic({
  currMonth,
  currDay,
  currYear,
  currDayOfWeek,
}: {
  currMonth: number;
  currDay: number;
  currYear: number;
  currDayOfWeek: number;
  calendar: IAptDay[];
}) {
  let newDay = currDay;
  let newMonth = currMonth;
  let newYear = currYear;
  let newDayOfWeek = currDayOfWeek;

  if (newDayOfWeek == 6) {
    newDayOfWeek = 0;
  } else {
    newDayOfWeek += 1;
  }

  switch (currMonth) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
      if (currDay >= 31) {
        newMonth += 1;
        newDay = 1;
      } else {
        newDay += 1;
      }
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      if (currDay >= 30) {
        newMonth += 1;
        newDay = 1;
      } else {
        newDay += 1;
      }
      break;
    case 2:
      if (
        (currDay >= 28 && !isLeapYear(currYear)) ||
        (currDay >= 29 && isLeapYear(currYear))
      ) {
        newMonth += 1;
        newDay = 1;
      } else {
        newDay += 1;
      }
      break;
    case 12:
      if (currDay >= 31) {
        newMonth = 1;
        newDay = 1;
        newYear += 1;
      } else {
        newDay += 1;
      }
      break;
  }

  return { newDay, newDayOfWeek, newMonth, newYear };
}
