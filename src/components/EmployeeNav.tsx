import { useState } from "react";
import { ButtonLink } from "./Button";
import { getEmail } from "../middleware/variables/Sessions";

export default function EmployeeNav() {
  const [hidden, setHidden] = useState(false);

  return (
    <section>
      <div
        className="flex alignCenter arrow"
        onClick={() => setHidden(!hidden)}
      >
        <h3>Employee Nav</h3>
        <i
          className={`${
            hidden
              ? "fa-solid fa-caret-up clearButton"
              : "fa-solid fa-caret-down clearButton"
          }`}
        ></i>
      </div>

      <div
        className={`flex-col alignStart employeeNav ${
          hidden ? "flex" : "displayNone"
        }`}
      >
        {ButtonLink({
          classNames: "goBack button",
          text: "Current Inventory",
          domain: "/inventory",
        })}

        {ButtonLink({
          classNames: "goBack button",
          text: "Shop for Inventory",
          domain: "/inventoryShop",
        })}

        {ButtonLink({
          classNames: "goBack button",
          text: "Estimates",
          domain: "/estimates",
        })}

        {ButtonLink({
          classNames: "goBack button",
          text: "Client Finances",
          domain: "/clientFinance",
        })}

        {getEmail?.toLowerCase() === "bobthebuilder@gmail.com"
          ? ButtonLink({
              classNames: "goBack button",
              text: "Purchase History",
              domain: "/purchases",
            })
          : ""}

        {ButtonLink({
          classNames: "goBack button",
          text: "Settings",
          domain: "/settings",
        })}
      </div>
    </section>
  );
}
