import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import ButtonLink from "../../components/Buttons/ButtonLink";
import Assets from "../../assets/Assets.js";
// import Employee from "./employee/Employee";
import { cacheEmail } from "../../middleware/Cache";
import "./home.css";
import { DarkModeContext } from "../../middleware/Context";
import { useContext } from "react";
import { labels } from "../../api/labels";

export default function Home() {
  const { toggleDarkMode } = useContext(DarkModeContext);

  return (
    <>
      {/* {cacheEmail ? (
        <Employee />
      ) : ( */}
      <main id="hero" className="flex flex-col items-center justify-between">
        <Nav props={{ pageHeading: "" }} />
        <section
          className={`mx-2 p-4 flex justify-between shadow-2xs ${toggleDarkMode === labels.mode.light ? labels.mode.light : labels.mode.dark}`}
        >
          <div className="w-60">
            <img
              src={Assets.whiteCar}
              alt={labels.home.whiteCarAlt}
              className="maxw-full"
            />
          </div>

          <section className="w-60 flex flex-col items-start justify-between">
            <div>
              <h2 className="mb-4 text-right">{labels.home.heroHeadingTwo}</h2>

              <div className="w-full flex justify-end">
                <p className="hero-paragraph">{labels.home.heroParagraph}</p>
              </div>
            </div>
            {cacheEmail
              ? ButtonLink({
                  classNames: `mt-6 align-end`,
                  domain: `/${labels.home.buttonEmployee.domain}`,
                  text: labels.home.buttonEmployee.text,
                })
              : ButtonLink({
                  classNames: `mt-6 align-end`,
                  domain: `/${labels.home.buttonReservation.domain}`,
                  text: labels.home.buttonReservation.text,
                })}
          </section>
        </section>
        <Footer />
      </main>
      {/* )} */}
    </>
  );
}
