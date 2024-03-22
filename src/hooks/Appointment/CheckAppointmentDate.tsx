import { toast } from "react-toastify";

export function checkAppointmentDate(
  date: string,
  time: string,
  setDate: (e: string) => void,
): string | void {
  if (!date) {
    toast.error("Pick a valid date");
    return;
  }

  if (!time) {
    toast.error("Pick a valid time");
    return;
  }

  const arrayOfDateAppt = date.split("D")[0].split("/");
  let arrayOfTimeAppt = time.split(":");

  let militaryTime: string = arrayOfTimeAppt[0];

  if (arrayOfTimeAppt[1].includes("PM") && !arrayOfTimeAppt[0].includes("12")) {
    militaryTime = (parseInt(arrayOfTimeAppt[0]) + 12).toString();
  }

  //military time

  const currentDate = new Date();

  //Checks if month/date/year of appointment is current/future date
  if (
    parseInt(arrayOfDateAppt[1]) < currentDate.getDate() ||
    parseInt(arrayOfDateAppt[0]) < currentDate.getMonth() + 1 ||
    parseInt(arrayOfDateAppt[2]) < currentDate.getFullYear()
  ) {
    toast.error("Choose a current date or a date in the future.");
    return;
  }

  //check if current month matches appointment month
  //check if current day matches appointment day
  //check if current year matches appointment year

  //check if appointment hours is less than the current hours value
  //check if current time has minutes, and if it does WHILE having the hours be less than the current hours value

  const checkForSameDay =
    currentDate.getMinutes() &&
    parseInt(militaryTime) <= currentDate.getHours() &&
    parseInt(arrayOfDateAppt[1]) === currentDate.getDate() &&
    parseInt(arrayOfDateAppt[0]) === currentDate.getMonth() + 1 &&
    parseInt(arrayOfDateAppt[2]) === currentDate.getFullYear();

  if (checkForSameDay) {
    toast.error("Choose a current time or a time in the future.");
    return;
  }

  const appointmentDayoFWeek = new Date(
    parseInt(date.split("/")[2]),
    parseInt(date.split("/")[0]),
    parseInt(date.split("/")[1]),
  );
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const getAppointmentDayoFWeek = appointmentDayoFWeek.getDay();

  if (!daysOfWeek.includes(date.split("D")[1])) {
    setDate(`${date}D${daysOfWeek[getAppointmentDayoFWeek]}`);
  }
}
