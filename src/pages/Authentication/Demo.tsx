import Header from "../../components/Header"
// import { Input, handleLogin } from "../../hooks/LoginHooks";
import { Button } from "../../components/Button";
import Footer from "../../components/Footer";
import {name, email, password} from "./DemoVariables"
import {Input} from "../../components/Input"

export default function Demo() {

  return (
    <main id="auth">
      <Header pageHeading={"Demo Account Login"} />

      <section className="flex flex-col alignCenter justifyCenter">
        <form className="flex flex-col alignCenter">
          {Input({
            type: "email",
            onChange: (e: string) => e,
            name: "email",
            placeholder: email,
            disabled: true,
          })}
          {Input({
            type: "text",
            onChange: (e: string) => e,
            name: "name",
            placeholder: name,
            disabled: true,
          })}
          {Input({
            type: "password",
            onChange: (e: string) => e,
            name: "password",
            placeholder: password,
            disabled: true,
          })}

          {/* {Button({
            onClick: () =>
              handleLogin({ email: email, name: name, password: password }),
            text: "Login",
          })} */}
        </form>
      </section>

      <Footer />
    </main>
  );
}