import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ButtonLink } from "../../components/Button";

export default function Auth() {
  return (
    <main className="flex flex-col justifyBetween">
      <Header pageHeading="Login/Demo" />

      <section className="flex flex-col alignCenter" id="employee">
        <nav>
          <ul className="flex justifyBetween flex-col">
            <li className="textAlignCenter">
              {ButtonLink({
                domain: "/adminDemo",
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
        </nav>
      </section>

      <Footer />
    </main>
  );
}
