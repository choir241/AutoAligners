import { useContext } from "react";
import {DisplayTimeDateAppointments} from "./DisplayTimeDateAppointments"
import { DarkModeContext } from "../../middleware/Context";
import "./reservation.css";
import Layout from "../../pages/Layout";

export default function Reservation() {

  const { toggleDarkMode } = useContext(DarkModeContext);
            {DisplayTimeDateAppointments()}

  return (
    <main id="reservation">
      <Layout pageHeading={"Make Reservation"}>
        <section
          className={`mx-2 flex items-start justify-around bg-white p-4 shadow-2xs ${
            toggleDarkMode === "dark" ? "light" : "dark"
          }`}
        >
          <section
            className="flex items-center flex-col w-full"
          >
          </section>
        </section>
      </Layout>
    </main>
  );
}
