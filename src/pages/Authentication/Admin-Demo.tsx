import Header from "../../components/Header";
import { HandleLogin } from "../../hooks/Auth/Login";
import { Button } from "../../components/Button";
import Footer from "../../components/Footer";
import { renderInputs, adminAccount } from "./Demo-Variables";
import { Input } from "../../components/Input";
import Auth from "./Auth";
import { InputInterface } from "../../middleware/variables/Interfaces";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../middleware/states/Zustand";
import { Action } from "../../middleware/states/Zustand-Types";

export default function AdminDemo() {
  const navigate = useNavigate();

  const setEmailCookie = useStore((action: Action) => action.setEmailCookie);

  return (
    <main id="auth">
      <Header pageHeading={"Admin Account Login"} />

      <section className="flex flex-row alignCenter justifyBetween">
        <form className="flex flex-col alignCenter">
          {renderInputs(
            { ...adminAccount, setEmailCookie: () => "" },
            { setEmail: () => "", setName: () => "", setPassword: () => "" },
          ).map((input: InputInterface) => {
            return Input({
              key: input.placeholder,
              type: input.type,
              onChange: input.onChange,
              name: input.name,
              placeholder: input.placeholder,
              disabled: input.disabled,
            });
          })}

          {Button({
            onClick: () =>
              HandleLogin({
                email: adminAccount.email,
                name: adminAccount.name,
                password: adminAccount.password,
                setEmailCookie: (e: string) => setEmailCookie(e),
                navigate: navigate("/employee"),
              }),
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
