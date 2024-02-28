import api from "../../middleware/api/AppWrite";
import { setEmail, getEmail } from "../../middleware/variables/Sessions";
import { toast } from "react-toastify";
import { LogoutInterface } from "../../middleware/variables/Interfaces";

export async function Logout(props: LogoutInterface) {
  try {
    setEmail("");
    props.setEmailCookie("");
    await api.deleteCurrentSession();

    if (getEmail() === "" && !getEmail()) {
      window.location.reload();
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
