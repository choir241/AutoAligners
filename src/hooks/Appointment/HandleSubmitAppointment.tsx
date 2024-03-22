import { Appointment } from "../../middleware/variables/Interfaces";
import api from "../../middleware/api/AppWrite";
import { Permission, Role } from "appwrite";

export async function HandleSubmitAppointment(
  props: Appointment,
): Promise<void> {
  const formData = {
    date: props.date,
    time: props.time,
    carMake: props.carMake,
    carYear: props.carYear,
    carModel: props.carModel,
    stayLeave: props.stayLeave,
    service: props.service,
    firstName: props.firstName,
    lastName: props.lastName,
    email: props.email,
    phone: props.phone,
    zipCode: props.zipCode,
    contact: props.contact,
    comment: props.comment,
  };

  await api.createDocument(
    import.meta.env.VITE_REACT_APP_DATABASE_ID,
    import.meta.env.VITE_REACT_APP_COLLECTION_ID,
    formData,
    [Permission.read(Role.any())],
  );

  window.location.reload();
}
