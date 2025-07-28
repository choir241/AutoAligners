import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import ButtonLink from "../../components/Buttons/ButtonLink";
import Assets from "../../assets/Assets.js";
// import Employee from "./employee/Employee";
import { cacheEmail } from "../../middleware/Cache";
import "./home.css";
import { DarkModeContext } from "../../middleware/Context";
import { useContext } from "react";

export default function Home() {
  const { toggleDarkMode } = useContext(DarkModeContext);

  return (
    <>
      {/* {cacheEmail ? (
        <Employee />
      ) : ( */}
        <main id="hero" className="flex flex-col items-center justify-between">
          <Nav props={{pageHeading:""}} />
          <section className={`mx-2 p-4 flex justify-between shadow-2xs ${toggleDarkMode === "dark" ? "light" : "dark"}`}>
          <div className="w-60">
              <img
                src={Assets.whiteCar}
                alt="white car"
                className="maxw-full"
              />
            </div>
            
            <section className="w-60 flex flex-col items-start justify-between">
              <div>
                <h2 className="mb-4 text-right">Say Goodbye to Car Repair Hassles</h2>

                <div className="w-full flex justify-end">
                <p className="hero-paragraph">
                  For over a century, dating back to 1892, we have been
                  steadfast in providing exceptional service. We are determined
                  to continue building on this legacy with your support.
                </p>
                </div>
  
              </div>
              {cacheEmail
                ? ButtonLink({
                    classNames: `mt-6 align-end`,
                    domain: "/employee",
                    text: "Employee Hub",
                  })
                : ButtonLink({
                    classNames: `mt-6 align-end`,
                    domain: "/reservation",
                    text: "Make Reservation",
                  })}
            </section>
          </section>
          <Footer />
        </main>
      {/* )} */}
    </>
  );
}