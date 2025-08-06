//interface type for appointments
export interface Appointment {
  $createdAt?: string;
  $id: string;
  date: string;
  time: string;
  carModel: string;
  carMake: string;
  carYear: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  contact: string;
  comment: string;
  stayLeave: string;
  service: string;
}

export interface TimeDateAppointments {
  setTime: (e: string) => void;
  appointmentId?: string;
  edit?: boolean;
  appointments: Appointment[];
  setDate: (e: string) => void;
  time: number | string;
  date: number | string;
}
