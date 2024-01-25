import { ButtonLink, Button } from "./Button";
import { Link } from "react-router-dom";
import { getEmail } from "../middleware/variables/Sessions";
import EmployeeNav from "./EmployeeNav";
import { HeaderInterface } from "../middleware/variables/Interfaces";
import { Logout } from "../hooks/Auth";

export default function Header(header: HeaderInterface) {
  return (
    <header>
      <nav className="flex justifyBetween alignCenter">
        <Link to="/">
          <h1>AutoAligners</h1>
        </Link>

        <ul className="flex alignCenter">
          <li>
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
          )}

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

        {getEmail ? (
          <div>
            {Button({
              onClick: () => Logout(),
              text: "Logout",
              classNames: "button",
            })}
          </div>
        ) : (
          ""
        )}

        {getEmail ? (
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
