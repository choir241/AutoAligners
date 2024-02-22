import Header from "../../components/Header";
import {HandleLogin} from "../../hooks/Auth/Login";
import { Button } from "../../components/Button";
import Footer from "../../components/Footer";
import { useState } from "react";
import { Input } from "../../components/Input";
import Auth from "./Auth";
import { renderInputs } from "./Demo-Variables";
import {
  InputInterface
} from "../../middleware/variables/Interfaces";
import {useNavigate} from "react-router-dom"
import {Action} from "../../middleware/states/Zustand-Types"
import {useStore} from "../../middleware/states/Zustand"

export default function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const setEmailCookie = useStore((action: Action)=>action.setEmailCookie);

  return (
    <main id="auth">
      <Header pageHeading={"Login"} />

      <section className="flex flex-row alignCenter justifyBetween">
        <form className="flex flex-col alignCenter">
          {renderInputs(
            { name: "Your Full Name", email: "Your Email Address", password: "Your Password", setEmailCookie: () => "" },
            {
              setEmail: (e: string) => setEmail(e),
              setName: (e: string) => setName(e),
              setPassword: (e: string) => setPassword(e),
            },
          ).map((input: InputInterface) => {
            return Input({
              key: input.placeholder,
              type: input.type,
              onChange: input.onChange,
              name: input.name,
              placeholder: input.placeholder,
            });
          })}
        

          {Button({
                    onClick: () =>
                      HandleLogin({email: email, name: name, password: password, setEmailCookie: (e:string)=>setEmailCookie(e),navigate: navigate("/")}),
                    text: "Login",
                    classNames: "button",
                  })}
        </form>

        <Auth />
      </section>

      <Footer />
    </main>
  );
}
