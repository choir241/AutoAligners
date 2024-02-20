import { useState } from "react";
import { ButtonLink } from "./Button";
import { getEmail } from "../middleware/variables/Sessions";
import { EmployeeNavInterface } from "../middleware/variables/Interfaces";

export default function EmployeeNav() {
  const [hidden, setHidden] = useState(false);

  const employeeNav = [
    {
      text: "Current Inventory",
      domain: "/inventory",
      condition: true,
    },
    {
      text: "Shop for Inventory",
      domain: "/inventoryShop",
      condition: true,
    },
    {
      text: "Estimates",
      domain: "/estimates",
      condition: true,
    },
    {
      text: "Client Finances",
      domain: "/clientFinance",
      condition: true,
    },
    {
      text: "Purchase History",
      domain: "/purchases",
      condition: false,
    },
    {
      text: "Settings",
      domain: "/settings",
      condition: true,
    },
  ];

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
        {employeeNav.map((nav: EmployeeNavInterface) => {
          const text = nav.text;
          const domain = nav.domain;
          if (nav.condition) {
            return (
              <ButtonLink
                classNames="button goBack"
                text={text}
                domain={domain}
              />
            );
          } else if (
            !nav.condition &&
            getEmail?.toLowerCase() === "bobthebuilder@gmail.com"
          ) {
            return (
              <ButtonLink
                classNames="button goBack"
                text={text}
                domain={domain}
              />
            );
          }
        })}
      </div>
    </section>
  );
}
