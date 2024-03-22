import { Appointment } from "../../middleware/variables/Interfaces";
import { checkAppointmentDate } from "./CheckAppointmentDate";
import { CheckInputValidation } from "./CheckInputValidation";

export function HandleCreateAppointment(
  date: string,
  time: string,
  setDate: (e: string) => void,
  props: Appointment,
) {
  checkAppointmentDate(date, time, (e: string) => setDate(e));

  if (
    !CheckInputValidation({
      service: props.service,
      firstName: props.firstName,
      lastName: props.lastName,
      date: props.date,
      time: props.time,
      carModel: props.carModel,
      carMake: props.carMake,
      carYear: props.carYear,
      email: props.email,
      phone: props.phone,
      zipCode: props.zipCode,
      contact: props.contact,
      comment: props.comment,
      stayLeave: props.stayLeave,
    })
  ) {
    return;
  }
}
