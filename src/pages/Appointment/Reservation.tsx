import { useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { AppointmentContext } from "../../middleware/states/Context";
import { GetCarData } from "../../hooks/Appointment/GetCarData";
import { SelectCarMakeInput } from "../../components/Reservation/SelectCar/SelectCarMakeInput";
import { SelectCarModelInput } from "../../components/Reservation/SelectCar/SelectCarModelInput";
import { SelectCarYearInput } from "../../components/Reservation/SelectCar/SelectCarYearInput";
import DisplayTimeAppointments from "../../components/Reservation/Calendar/DisplayAppointments";
import { RenderCarServices } from "../../components/InputForms/RenderCarServices";
import {
  GeneralInput,
  ChooseTwoInput,
  TextBoxInput,
} from "../../components/InputForms/Inputs";
import { HandleCreateAppointment } from "../../hooks/Appointment/HandleCreateAppointment";
import Header from "../../components/Header";

export default function Reservation() {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const appointmentData = useContext(AppointmentContext);
  const [carService, setCarService] = useState<string>("");
  const [carModel, setCarModel] = useState<string>("");
  const [carMake, setCarMake] = useState<string>("");
  const [carYear, setCarYear] = useState<string>("");
  const [carMakeOptions, setCarMakeOptions] = useState<React.JSX.Element[]>([]);
  const [carModelOptions, setCarModelOptions] = useState<React.JSX.Element[]>(
    [],
  );

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [carYearOptions, setCarYearOptions] = useState<React.JSX.Element[]>([]);
  const [stayLeave, setStay_Leave] = useState<string>("");

  useEffect(() => {
    GetCarData({
      onMakeSelect: setCarMakeOptions,
      onModelSelect: setCarModelOptions,
      onYearSelect: setCarYearOptions,
      carMake: carMake,
      carModel: carModel,
    });
  }, [carMake, carModel]);

  return (
    <main id="reservation">
      <Header />
      {DisplayTimeAppointments()}

      <section className="flex flex-col">
        <div className="flex justifyBetween">
          <section className="section-1 flex flex-col alignCenter">
            <section className="flex flex-col alignCenter">
              {SelectCarMakeInput({
                defaultValue: "Car Make",
                options: carMakeOptions,
                onChange: (e: string) => setCarMake(e),
                carMake: carMake,
                carYear: carYear,
                carModel: carModel,
                resetModel: (e: string) => setCarModel(e),
                resetYear: (e: string) => setCarYear(e),
                resetMake: (e: string) => setCarMake(e),
              })}

              {SelectCarModelInput({
                defaultValue: "Car Model",
                options: carModelOptions,
                onChange: (e: string) => setCarModel(e),
                carModel: carModel,
                carYear: carYear,
                resetModel: (e: string) => setCarModel(e),
                resetYear: (e: string) => setCarYear(e),
              })}

              {SelectCarYearInput({
                defaultValue: "Car Year",
                options: carYearOptions,
                onChange: (e: string) => setCarYear(e),
                carYear: carYear,
              })}
            </section>

            {ChooseTwoInput({
              text1: "Drop off car",
              text2: "Wait for car",
              name: "stayLeave",
              onChange: (e: string) => setStay_Leave(e),
            })}

            {RenderCarServices((e: string) => setCarService(e))}
          </section>

          <section className="section-1 flex flex-col alignCenter">
            <section className="flex justifyBetween contact">
              {GeneralInput({
                type: "text",
                onChange: (e: string) => setFirstName(e),
                placeholder: "First Name",
              })}
              {GeneralInput({
                type: "text",
                onChange: (e: string) => setLastName(e),
                placeholder: "Last Name",
              })}
            </section>

            <section className="flex justifyBetween contact">
              {GeneralInput({
                type: "text",
                onChange: (e: string) => setEmail(e),
                placeholder: "Email Address",
              })}
              {GeneralInput({
                type: "tel",
                onChange: (e: string) => setPhone(e),
                placeholder: "###-###-####",
                minLength: 10,
                maxLength: 10,
              })}
            </section>

            {GeneralInput({
              type: "text",
              onChange: (e: string) => setZipCode(e),
              placeholder: "Postal/Zip Code",
              minLength: 5,
              maxLength: 5,
            })}

            <section className="flex flex-col alignCenter contact">
              <h2>Preferred Contact Method</h2>

              {ChooseTwoInput({
                text1: "Email",
                text2: "Phone",
                name: "contact",
                onChange: (e: string) => setContact(e),
              })}
              {TextBoxInput({
                width: 50,
                height: 10,
                onChange: (e: string) => setComment(e),
                placeholder: "Additional Comments",
              })}
            </section>
          </section>
        </div>
      </section>

      <div className="flex justifyCenter">
        <Button
          text="Reserve Appointment"
          classNames="button"
          onClick={() =>
            HandleCreateAppointment(date, time, (e: string) => setDate(e), {
              service: carService,
              firstName: firstName,
              lastName: lastName,
              date: date,
              time: time,
              carModel: carModel,
              carMake: carMake,
              carYear: carYear,
              email: email,
              phone: phone,
              zipCode: zipCode,
              contact: contact,
              comment: comment,
              stayLeave: stayLeave,
            })
          }
        />
      </div>
    </main>
  );
}
