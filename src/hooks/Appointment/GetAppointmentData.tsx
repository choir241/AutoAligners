import { toast } from "react-toastify";
import api from "../../middleware/api/AppWrite";

export async function GetAppointmentData() {
  try {
    const data = await api.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID,
    );
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
