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
import CarInput from "./CarInput";

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
          <div className="flex justifyBetween">
            <CarInput
              carService={carService}
              carModel={carModel}
              carYear={carYear}
              carYearOptions={carYearOptions}
              carModelOptions={carModelOptions}
              setCarService={setCarService}
              setCarMake={setCarMake}
              setCarYear={setCarYear}
              setCarMakeOptions={setCarMakeOptions}
              setCarModel={setCarModel}
              carMake={carMake}
              carMakeOptions={carMakeOptions}
              setCarModelOptions={setCarModelOptions}
              setStay_Leave={setStay_Leave}
            />
          </div>
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
