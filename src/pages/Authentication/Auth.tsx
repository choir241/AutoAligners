import { ButtonLink } from "../../components/Button";

export default function Auth() {
  return (
    <section id="employee">
      <ul className="flex justifyBetween flex-col">
        <li className="textAlignCenter">
          {ButtonLink({
            domain: "/admin-demo",
            text: "Admin Demo",
            classNames: "button",
          })}
        </li>

        <li className="textAlignCenter">
          {ButtonLink({
            domain: "/demo",
            text: "Demo",
            classNames: "button",
          })}
        </li>

        <li className="textAlignCenter">
          {ButtonLink({
            domain: "/login",
            text: "Login",
            classNames: "button",
          })}
        </li>
      </ul>
    </section>
  );
}
