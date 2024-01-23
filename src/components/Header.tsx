import { ButtonLink } from "./Button";
import { Link } from "react-router-dom";
import { getEmail } from "../middleware/Sessions";
import EmployeeNav from "./EmployeeNav";

export default function Nav() {
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
            <li>{ButtonLink({ text: "Login/Demo", domain: "/employee" })}</li>
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

        {/* {cacheEmail ? (
          <div>
            {ButtonSubmit({
              handleButtonClick: () => handleLogout(),
              text: "Logout",
            })}
          </div>
        ) : (
          ""
        )} */}

        {getEmail ? (
          ""
        ) : (
          <div>
            {ButtonLink({ domain: "/reservation", text: "Make Reservation" })}
          </div>
        )}
      </nav>

      {/* <h2>{props.pageHeading}</h2> */}
    </header>
  );
}
