import {
  getDay,
  getMonth,
  getYear,
  getDayOfWeek,
  getFullDate,
} from "../../Dates";
import { useState } from "react";
import {
  TimeDateAppointmentsInterface,
  RenderCalendarInterface,
} from "../../../middleware/variables/Interfaces";

function handleRenderCalendar(props: RenderCalendarInterface) {
  const date = `${props.currentMonth}/${props.currentDay}/${
    props.currentYear
  }D${props.daysOfWeek[props.currentDayOfWeek]}`;
  props.setDate(date);
  document.querySelectorAll(".calendar").forEach((ele) => {
    ele.classList.remove("clicked");
  });

  document.querySelector(`.c-${props.i}`)?.classList.add("clicked");
}

export function Calendar(props: TimeDateAppointmentsInterface) {
  const [selectedDate, setSelectedDate] = useState<string>(getFullDate());

  //list of days in a week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dates: React.JSX.Element[] = [];

  let month = getMonth();
  let day = getDay();
  let year = getYear();
  let dayOfWeek = getDayOfWeek();

  for (let i = 0; i < 8; i++) {
    switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
        if (day > 31) {
          day = 1;
          month++;
        }
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        if (day > 30) {
          day = 1;
          month++;
        }
        break;
      case 2:
        if (day > 28) {
          day = 1;
          month++;
        }
        break;
      case 12:
        if (day > 31) {
          day = 1;
          month++;
          year++;
        }
        break;
    }

    //have the current date as the default value
    //set a state called selectedDate and save the current date to its value
    //if a different date is selected, change the selected date as the current value of setSelectedDate
    //use the selectedDate value to show the different appointment times that are avaiable for the respective date

    if (dayOfWeek > 6) {
      dayOfWeek = 0;
    }
    const date = `${month}/${day}/${year}`;

    if (props.date?.split("D")[0] === `${month}/${day}/${year}`) {
      dates.push(
        <div
          className={`calendar clearButton c-${i} clicked`}
          key={`c-${i}`}
          onClick={() => {
            setSelectedDate(date);
            handleRenderCalendar({
              currentMonth: month,
              currentDay: day,
              currentYear: year,
              daysOfWeek: daysOfWeek,
              currentDayOfWeek: dayOfWeek,
              setDate: (e: string) => props.setDate(e),
              i: i,
            });
          }}
        >
          <h3>{daysOfWeek[dayOfWeek]}</h3>
          <h3>{`${month}/${day}/${year}`}</h3>
        </div>,
      );
    } else {
      dates.push(
        <div
          className={`calendar clearButton c-${i}`}
          key={`c-${i}`}
          onClick={() => {
            setSelectedDate(date);
            handleRenderCalendar({
              currentMonth: month,
              currentDay: day,
              currentYear: year,
              daysOfWeek: daysOfWeek,
              currentDayOfWeek: dayOfWeek,
              setDate: (e: string) => props.setDate(e),
              i: i,
            });
          }}
        >
          <h3>{daysOfWeek[dayOfWeek]}</h3>
          <h3>{`${month}/${day}/${year}`}</h3>
        </div>,
      );
    }

    day++;
    dayOfWeek++;
  }

  return dates;
}
