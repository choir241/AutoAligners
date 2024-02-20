import api from "../../middleware/api/AppWrite";
import { AuthInterface } from "../../middleware/variables/Interfaces";
import { toast } from "react-toastify";
import { setEmail } from "../../middleware/variables/Sessions";

export async function Login(props: AuthInterface) {
  try {
    await api.createSession(props.email, props.password);
    await api.getAccount();
    setEmail(props.email);
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
