import api from "../../middleware/api/AppWrite";
import { AuthInterface } from "../../middleware/variables/Interfaces";
import { toast } from "react-toastify";
import { setEmail } from "../../middleware/variables/Sessions";

export async function Login(props: AuthInterface) {
  try {
    await api.createSession(props.email, props.password);
    const response = await api.getAccount();
    if (response) {
      console.log(response);
      setEmail(props.email);
      window.location.reload();
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
