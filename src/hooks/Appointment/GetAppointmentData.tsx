import { toast } from "react-toastify";
import api from "../../middleware/api/AppWrite";
import { FetchAppointmentInterface } from "../../middleware/variables/Interfaces";

export async function GetAppointmentData(props: FetchAppointmentInterface) {
  try {
    const data = await api.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID,
    );

    props.setAppointmentData(data?.documents ?? []);
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
