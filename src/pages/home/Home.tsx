import ButtonLink from "../../components/Buttons/ButtonLink";
import Assets from "../../assets/Assets.js";
// import Employee from "./employee/Employee";
import { cacheEmail } from "../../middleware/Cache";
import "./home.css";
import { DarkModeContext } from "../../middleware/Context";
import { useContext } from "react";
import { labels } from "../../api/labels";
import Layout from "../Layout";
import Reservation from "../../components/Reservation/Reservation";

export default function Home() {
  const { toggleDarkMode } = useContext(DarkModeContext);

  return (
    <Layout pageHeading="">
      <main id="hero" className="flex flex-col items-center justify-between">
        <section
          className={`mx-2 p-4 flex justify-between shadow-2xs ${toggleDarkMode === labels.mode.light ? labels.mode.light : labels.mode.dark}`}
        >
          <Reservation/>

        </section>
      </main>
    </Layout>
  );
}
