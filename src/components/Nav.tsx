import { useState, useEffect, useContext } from "react";
import ButtonLink from "../components/Buttons/ButtonLink";
import ButtonSubmit from "../components/Buttons/ButtonSubmit";
import { handleLogout } from "../hooks/Auth/handleLogout";
import { Link } from "react-router-dom";
import EmployeeNav from "./EmployeeNav";
// import { CartItem } from "../middleware/Interfaces/Cart";
import { INav } from "../interfaces/General";
import { cacheEmail } from "../middleware/Cache";
import { DarkModeContext } from "../middleware/Context";
import DarkMode from "./DarkMode";
// import { FaShoppingCart } from "react-icons/fa";

export default function Nav({ props }: { props: INav }) {
  //   const [cartQuantity, setCartQuantity] = useState<number>();
  //   const { cart } = useContext(APIContext);
  const { toggleDarkMode } = useContext(DarkModeContext);

  //   useEffect(() => {
  //     if (cacheEmail && cart?.length) {
  //       let sum: number = 0;

  //       cart.forEach((item: CartItem) =>
  //         item.email === cacheEmail ? (sum += parseInt(item.quantity)) : "",
  //       );

  //       setCartQuantity(sum);
  //     }
  //   }, [cart]);

  const url = window.location.href;
  const splitUrl = url.split("/");
  const currentUrl = splitUrl[splitUrl.length - 1];

  return (
    <header className="w-full">
      <nav
        className={`${toggleDarkMode === "dark" ? "bg-nav" : "darkNav"} bg-nav flex w-full justify-between`}
      >
        <div className="flex items-center">
          <Link to="/" className="p-2">
            <h1>AutoAligners</h1>
          </Link>
          {DarkMode()}
        </div>

        <ul className="flex w-40 justify-between">
          <li className="items-center flex">
            <Link
              to="/"
              className={`${currentUrl === "" ? "current-link" : ""}`}
            >
              Home
            </Link>
          </li>
          {cacheEmail ? (
            <li className="items-center flex">
              <EmployeeNav />
            </li>
          ) : (
            <li className="items-center flex">
              <Link
                to="/login"
                className={`${currentUrl === "login" || currentUrl === "register" ? "current-link" : ""}`}
              >
                Login/Demo
              </Link>
            </li>
          )}

          {/* {cacheEmail ? (
            <li className="cart flex items-center">
              {cart?.length && cartQuantity ? <span className="cartQuantity">{cartQuantity}</span> : ""}
              <Link to="/cart" className={`${currentUrl === "cart" ? "current-link" : "" }`}>
                <FaShoppingCart />
              </Link>
            </li>
          ) : (
            ""
          )} */}

          {cacheEmail ? (
            <div className="items-center flex p-2">
              {ButtonSubmit({
                handleButtonClick: () => handleLogout(),
                text: "Logout",
              })}
            </div>
          ) : (
            ""
          )}

          {cacheEmail ? (
            ""
          ) : (
            <div className="items-center flex p-2">
              {ButtonLink({
                classNames: `${currentUrl === "reservation" ? "current-link" : ""}`,
                domain: "/reservation",
                text: "Make Reservation",
              })}
            </div>
          )}
        </ul>
      </nav>

      <h2 className="p-4">{props.pageHeading}</h2>
    </header>
  );
}
