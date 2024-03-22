import { ButtonLink, Button } from "./Button";
import { Link } from "react-router-dom";
import { getEmail } from "../middleware/variables/Sessions";
import EmployeeNav from "./Employee-Nav";
import {
  HeaderInterface,
  EmployeeNavInterface,
} from "../middleware/interfaces/component";
import { Logout } from "../hooks/Auth/Logout";
import { useStore } from "../middleware/states/Zustand";
import { Action, State } from "../middleware/states/Zustand-Types";

export default function Header(header: HeaderInterface) {
  const setEmailCookie = useStore((action: Action) => action.setEmailCookie);
  const emailCookie = useStore((state: State) => state.emailCookie);

  const headerNav = [
    {
      text: "Employee Hub",
      domain: "/",
      condition: true,
    },
    {
      text: "Home",
      domain: "/",
      condition: false,
    },
    {
      text: "Estimate Car Service",
      domain: "/estimate",
      condition: false,
    },
    {
      text: "Finance",
      domain: "/finance",
      condition: false,
    },
    {
      text: "Login/Demo",
      domain: "/login",
      condition: false,
    },
    {
      text: "Manage Appoinments",
      domain: "/manageAppointments",
      condition: true,
    },
  ];

  return (
    <header>
      <nav className="flex justifyBetween alignCenter">
        <Link to="/">
          <h1>AutoAligners</h1>
        </Link>

        <ul className="flex alignCenter">
          {headerNav.map((navLinks: EmployeeNavInterface) => {
            const text = navLinks.text;
            const domain = navLinks.domain;
            if (!navLinks.condition && !getEmail() && !emailCookie) {
              return (
                <li key={`${text}${domain}`}>
                  {ButtonLink({
                    text: text,
                    domain: domain,
                  })}
                </li>
              );
            } else if (navLinks.condition && (getEmail() || emailCookie)) {
              return (
                <li key={`${text}${domain}`}>
                  {ButtonLink({
                    text: text,
                    domain: domain,
                    key: `${text}${domain}`,
                  })}
                </li>
              );
            }
          })}

          {getEmail() || emailCookie ? (
            <li>
              <EmployeeNav />
            </li>
          ) : (
            ""
          )}

          {/* <li>
            {ButtonLink({
              text: getEmail ? "Employee Hub" : "Home",
              domain: "/",
            })}
          </li>

          {getEmail ? (
            ""
          ) : (
            <li>
              {ButtonLink({
                text: "Estimate Car Service",
                domain: "/estimate",
              })}
            </li>
          )}

          {getEmail ? (
            ""
          ) : (
            <li>{ButtonLink({ text: "Finance", domain: "/finance" })}</li>
          )}

          {getEmail ? (
            <li>
              <EmployeeNav />
            </li>
          ) : (
            <li>{ButtonLink({ text: "Login/Demo", domain: "/auth" })}</li>
          )}

          {getEmail ? (
            <li>
              {ButtonLink({
                text: "Manage Appoinments",
                domain: "/manageAppointments",
              })}
            </li>
          ) : (
            ""
          )} */}

          {/* {cacheEmail ? (
            <li className="cart">
              {cart?.length && cartQuantity ? <span>{cartQuantity}</span> : ""}
              <Link to="/cart">
                <i className="fa-solid fa-cart-shopping button"></i>
              </Link>
            </li>
          ) : (
            ""
          )} */}
        </ul>

        {getEmail() || emailCookie ? (
          <div>
            {Button({
              onClick: () =>
                Logout({ setEmailCookie: (e: string) => setEmailCookie(e) }),
              text: "Logout",
              classNames: "button",
            })}
          </div>
        ) : (
          ""
        )}

        {getEmail() || emailCookie ? (
          ""
        ) : (
          <div>
            {ButtonLink({
              domain: "/reservation",
              text: "Make Reservation",
              classNames: "button",
            })}
          </div>
        )}
      </nav>

      {header.pageHeading ? <h2>{header.pageHeading}</h2> : ""}
    </header>
  );
}
