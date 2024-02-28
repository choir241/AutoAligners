import api from "../../middleware/api/AppWrite";
import { AuthInterface } from "../../middleware/variables/Interfaces";
import { toast } from "react-toastify";
import { setEmail, getEmail } from "../../middleware/variables/Sessions";

export async function HandleLogin(props: AuthInterface) {
  try {
    props.setEmailCookie(props.email);
    setEmail(props.email);
    await api.createSession(props.email, props.password);
    await api.getAccount();
    if (getEmail() !== "" && getEmail()) {
      props.navigate;
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
