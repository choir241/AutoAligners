const date = new Date();

export function getMonth() {
  return date.getMonth() + 1;
}

export function getYear() {
  return date.getFullYear();
}

export function getDay() {
  return date.getDate();
}
