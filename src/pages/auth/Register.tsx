import { TextInput } from "../../components/Inputs/TextInput";
import ButtonSubmit from "../../components/Buttons/ButtonSubmit"
import { DarkModeContext } from "../../middleware/Context";
import { useContext, useState } from "react";
import Layout from "../Layout";

export default function Register() {
  const { toggleDarkMode } = useContext(DarkModeContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  return (
    <Layout pageHeading="Register a new account">
    <main id="auth">

<div className="flex flex-col items-center">
      <section
        className={`h-36vh mx-2 p-6 flex flex-col shadow-2xs ${
          toggleDarkMode === "dark" ? "light" : "dark"
        }`}
      >
        <form className="flex flex-col items-center justify-between">
        <label className="my-1">Your Email</label>
          {TextInput({
            type: "email",
            name: "email",
            onChange: (e) => setEmail(e),
            placeholder: "Your Email",
          })}
        
        <label className="my-1">Your Name</label>
          {TextInput({
            type: "text",
            name: "name",
            onChange: (e) => setName(e),
            placeholder: "Your Full Name",
          })}

          {/* {ButtonSubmit({
            handleButtonClick: () =>
              handleSignUp({ email: email, name: name, password: password }),
            text: "Register",
            className: "mt-2",
          })} */}

          <p className=" my-2">Already have an account? <a className="text-white" href="/login">Login to your account here.</a></p>

        </form>
      </section>
      </div>
    </main>
    </Layout>
  );
}