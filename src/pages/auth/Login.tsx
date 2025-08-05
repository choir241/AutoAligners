import { DarkModeContext } from "../../middleware/Context";
import { useContext, useState } from "react";
import { TextInput } from "../../components/Inputs/TextInput";
import ButtonSubmit from "../../components/Buttons/ButtonSubmit";
import { handleLogin } from "../../hooks/Auth/handleLogin";
import { checkLoginCredentials } from "../../hooks/Auth/checkLoginCredentials";
import Layout from "../Layout";

export default function Login() {
  const { toggleDarkMode } = useContext(DarkModeContext);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const demoName = "Helena Blavatsky";
  const demoEmail = "helena24@gmail.com";
  const demoPassword = "dKiif87|5";

  return (
    <Layout pageHeading="">
      <main id="auth">
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
              onChange: (e) => handleChange(e),
              placeholder: "Your Email",
            })}

            <label className="my-1">Your Full Name</label>
            {TextInput({
              type: "text",
              name: "name",
              onChange: (e) => handleChange(e),
              placeholder: "Your Name",
            })}

            <label className="my-1">Your Password</label>
            {TextInput({
              type: "password",
              name: "password",
              onChange: (e) => handleChange(e),
              placeholder: "Your Password",
            })}

            {ButtonSubmit({
              handleButtonClick: () => {
                if (
                  checkLoginCredentials({
                    email: userData.email,
                    name: userData.name,
                    password: userData.password,
                  })
                ) {
                  handleLogin({
                    email: userData.email,
                    name: userData.name,
                    password: userData.password,
                  });
                }
              },
              text: "Login",
              className: "mt-2",
            })}

            {ButtonSubmit({
              handleButtonClick: () => {
                if (
                  checkLoginCredentials({
                    email: demoEmail,
                    name: demoName,
                    password: demoPassword,
                  })
                ) {
                  handleLogin({
                    email: demoEmail,
                    name: demoName,
                    password: demoPassword,
                  });
                }
              },
              text: "Log into Demo Account",
              className: "mt-2",
            })}

            <p className="my-2">
              Don't have an account?{" "}
              <a className="text-white" href="/register">
                Register a new account here.
              </a>
            </p>
          </form>
        </section>
      </main>
    </Layout>
  );
}
