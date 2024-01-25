import api from "../middleware/api/AppWrite";
import { setEmail } from "../middleware/variables/Sessions";

export async function Logout() {
  try {
    const user = await api.deleteCurrentSession();
    setEmail("");

    if (user) {
      window.location.reload();
    }
  } catch (err) {
    console.error(err);
  }
}
