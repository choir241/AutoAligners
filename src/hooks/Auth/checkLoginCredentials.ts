import { toast } from "react-toastify";
import { type ILogin } from "../../interfaces/Auth";

export function checkLoginCredentials(props: ILogin) {
  if (!props.email) {
    toast.error("Please input an email address");
    return false;
  } else if (!props.name) {
    toast.error("Please input your full name");
    return false;
  } else if (!props.password) {
    toast.error("Please input a password");
    return false;
  }

  const fullName = /^[A-Za-z\s]+$/;
  const mail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!fullName.test(props.name)) {
    toast.error("Please input a valid full name");
    return false;
  } else if (!mail.test(props.email)) {
    toast.error("Please input a valid password");
    return false;
  }
}
