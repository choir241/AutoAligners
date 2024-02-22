import api from "../../middleware/api/AppWrite";
import { setEmail } from "../../middleware/variables/Sessions";
import { toast } from "react-toastify";
import { LogoutInterface } from "../../middleware/variables/Interfaces";

export async function Logout(props: LogoutInterface) {
  try {
    await api.deleteCurrentSession();
    setEmail("");
    props.setEmailCookie("");
    window.location.reload();
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
