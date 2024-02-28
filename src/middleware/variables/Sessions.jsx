export function getEmail() {
  return sessionStorage.getItem("email");
}

export function setEmail(email) {
  sessionStorage.setItem("email", email);
}
