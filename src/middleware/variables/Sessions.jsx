export const getEmail = sessionStorage.getItem("email");

export function setEmail(email) {
  sessionStorage.setItem("email", email);
}
