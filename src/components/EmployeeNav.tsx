import { useState } from "react";
import ButtonLink from "./Buttons/ButtonLink";
import { cacheEmail } from "../middleware/Cache";

export default function EmployeeNav() {
  const [hidden, setHidden] = useState(false);

  return (
    <section>
      <h3 className="cursor-pointer employeeLink" onClick={() => setHidden(!hidden)}>
        Employee Nav
      </h3>

      <div className={`employeeNav ${hidden ? "" : "hidden"}`}>
        {ButtonLink({
          classNames: "mb-4",
          text: "Manage Appointments",
          domain: "/manageAppointments",
        })}
        {ButtonLink({
          classNames: "mb-4",
          text: "Current Inventory",
          domain: "/inventory",
        })}
        {ButtonLink({
          classNames: "mb-4",
          text: "Shop for Inventory",
          domain: "/inventoryShop",
        })}
        {cacheEmail?.toLowerCase() === "bobthebuilder@gmail.com"
          ? ButtonLink({
              classNames: "mb-4",
              text: "Purchase History",
              domain: "/purchases",
            })
          : ""}
        {ButtonLink({
          text: "Settings",
          domain: "/settings",
        })}
      </div>
    </section>
  );
}