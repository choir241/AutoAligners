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

  return (
    <div id="reservation">
      <Layout pageHeading="">
        <main
          id="hero"
          className={`flex flex-col items-center justify-center h-36vh mx-2 bg-white p-4 shadow-2xs ${toggleDarkMode === labels.mode.light ? labels.mode.light : labels.mode.dark}`}
        >
          <section className="flex flex-col items-center justify-between">
            {RenderTimeAndDates({
              calendar: calendar(),
              apptDateAndTime: apptDateAndTime,
              setApptDateAndTime: handleUpdateApptDateAndTime,
            })}

            <Reservation
              carMake={carMake}
              setService={handleUpdateService}
              apptDateAndTime={apptDateAndTime}
              handleUpdateCarMake={handleUpdateCarMake}
              handleUpdateCarModel={handleUpdateCarModel}
              handleUpdateCarYear={handleUpdateCarYear}
            />
          </section>
        </main>
      </Layout>
    </div>
  );
}
