export const cacheEmail = sessionStorage.getItem("email");
export const cacheEditAppointmentData = sessionStorage.getItem(
  "editAppointmentData",
);
export const cacheAppointmentID = sessionStorage.getItem("id");

export function SetCacheEmail(value: string) {
  sessionStorage.setItem("email", value);
}

export function SetCacheEdit(value: string) {
  sessionStorage.setItem("editAppointmentData", value);
}

export function SetCacheID(value: string) {
  sessionStorage.setItem("id", value);
}
