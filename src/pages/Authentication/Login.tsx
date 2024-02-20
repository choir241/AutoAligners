import Header from "../../components/Header";
// import { Input, handleLogin } from "../../hooks/LoginHooks";
import { Button, ButtonLink } from "../../components/Button";
import Footer from "../../components/Footer";
import { useState } from "react";
import { Input } from "../../components/Input";
import Auth from "./Auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main id="auth">
      <Header pageHeading={"Login"} />

      <section className="flex flex-row alignCenter justifyBetween">
        <form className="flex flex-col alignCenter">
          {Input({
            type: "email",
            onChange: (e: string) => setEmail(e),
            name: "email",
            placeholder: "Your Email Address",
          })}
          {Input({
            type: "text",
            onChange: (e: string) => setName(e),
            name: "name",
            placeholder: "Your Full Name",
          })}
          {Input({
            type: "password",
            onChange: (e: string) => setPassword(e),
            name: "password",
            placeholder: "Your Password",
          })}

          {/* {Button({
                    onClick: () =>
                      handleLogin({ email: email, name: name, password: password }),
                    text: "Login",
                  })} */}
        </form>

        <Auth />
      </section>

      <Footer />
    </main>
  );
}
