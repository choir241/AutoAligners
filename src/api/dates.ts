//list of days in a week
export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const date = new Date();

//+1 because Date.prototype.getMonth() starts at 0 to represent index
export const getMonth = () => {
  return date.getMonth() + 1;
};

export const getDay = () => {
  return date.getDate();
};

export const getYear = () => {
  return date.getFullYear();
};

export const getDayOfWeek = () => {
  return date.getDay();
};

export const getHours = () => {
  return date.getHours();
};

export const getMinutes = () => {
  return date.getMinutes();
};
