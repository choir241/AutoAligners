import api from "../../api/api";
import { SetCacheEmail } from "../../middleware/Cache";

export async function handleLogout(): Promise<void> {
  try {
    const user = await api.deleteCurrentSession();
    SetCacheEmail("");
    if (user) {
      window.location.reload();
    }
  } catch (err) {
    console.error(err);
  }
}
