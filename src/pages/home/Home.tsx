import "./home.css";
import { DarkModeContext } from "../../middleware/Context";
import { useContext, useState, useEffect } from "react";
import { labels } from "../../api/labels";
import Layout from "../Layout";
import RenderTimeAndDates from "../../components/Reservation/calendar/RenderTimeandDates";
import { calendar } from "../../components/Reservation/calendar/calendar";
import "../../components/Reservation/calendar/reservation.css";
import { IAptDateAndTime } from "../../components/Reservation/calendar/RenderTimeandDates";
import Reservation from "../../components/Reservation/calendar/Reservation";
import UserForm from "../../components/Reservation/userInputs/UserForm";
import RenderCarInputs from "../../components/Reservation/carInputs/RenderCarInputs";

export interface ICarData {
  carMake: string;
  carModel: string;
  carYear: string;
}

export default function Home() {
  const { toggleDarkMode } = useContext(DarkModeContext);
  const [apptDateAndTime, setApptDateAndTime] = useState({
    from: "",
    to: "",
    dayOfWeek: 0,
    date: "",
  });
  const [service, setService] = useState("");
  const [carMake, setCarMake] = useState("");
  const [carYear, setCarYear] = useState("");
  const [carModel, setCarModel] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredContact, setPreferredContact] = useState("email");

  const handleUpdateService = (service: string) => {
    setService(service);
  };

  const handleUpdateApptDateAndTime = (aptDateAndTime: IAptDateAndTime) => {
    setApptDateAndTime(aptDateAndTime);
  };

  const handleUpdateCarMake = (carMake: string) => {
    setCarMake(carMake);
  };

  const handleUpdateCarModel = (carModel: string) => {
    setCarModel(carModel);
  };

  const handleUpdateCarYear = (carYear: string) => {
    setCarYear(carYear);
  };

  const handleUpdateFirstName = (firstName: string) => {
    setFirstName(firstName);
  };

  const handleUpdateLastName = (lastName: string) => {
    setLastName(lastName);
  };

  const handleUpdatePreferredContact = (contact: string) => {
    setPreferredContact(contact);
  };

  const handleUpdatePhone = (phone: string) => {
    setPhone(phone);
  }

  const handleUpdateEmail = (email: string) => {
    setEmail(email);
  }

  return (
    <div id="reservation">
      <Layout pageHeading="">
        <main
          id="hero"
        >
          <div className="flex items-center justify-center">
          {RenderTimeAndDates({
            calendar: calendar(),
            apptDateAndTime: apptDateAndTime,
            setApptDateAndTime: handleUpdateApptDateAndTime,
          })}
          </div>


          <section className="flex flex-start mb-10">
            <UserForm
              props={{
                handleUpdateEmail,
                preferredContact,
                handleUpdatePreferredContact,
                handleUpdateFirstName,
                handleUpdateLastName,
                handleUpdatePhone,
              }}
            />
          </section>
          <section className="flex flex-start mb-10">

            <RenderCarInputs
              carModel={carModel}
              carMake={carMake}
              handleUpdateService={handleUpdateService}
              handleUpdateCarMake={handleUpdateCarMake}
              handleUpdateCarModel={handleUpdateCarModel}
              handleUpdateCarYear={handleUpdateCarYear}
            />
            </section>
            {/* <Reservation apptDateAndTime={apptDateAndTime} /> */}
        </main>
      </Layout>
    </div>
  );
}
