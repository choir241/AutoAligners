import api from "../../api/api";
import { toast } from "react-toastify";
import { type ILogin } from "../../interfaces/Auth";
import { SetCacheEmail } from "../../middleware/Cache";

export async function handleLogin(props: ILogin): Promise<void> {
  try {
    await api.createSession(props.email, props.password);
    const response = await api.getAccount();
    
    if (response) {
      SetCacheEmail(props.email);
      window.location.reload();
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
