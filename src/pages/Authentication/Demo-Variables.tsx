import { AuthInterface, Auth } from "../../middleware/variables/Interfaces";

export const buttons = [
  {
    domain: "/admin-demo",
    text: "Admin Demo",
    classNames: "button",
  },
  {
    domain: "/demo",
    text: "Demo",
    classNames: "button",
  },
  {
    domain: "/login",
    text: "Login",
    classNames: "button",
  },
];
export const demoAccount = {
  name: "Helena Blavatsky",
  email: "helena24@gmail.com",
  password: "dKiif87|5",
};

export const adminAccount = {
  name: "Bob The Builder",
  email: "BobTheBuilder@gmail.com",
  password: "Dsbmz58!",
};

export function renderInputs(props: AuthInterface, auth: Auth) {
  return [
    {
      type: "email",
      onChange: auth.setEmail ? auth.setEmail : (e: string) => e,
      name: "email",
      placeholder: props.email,
      disabled: true,
    },
    {
      type: "text",
      onChange: auth.setName ? auth.setName : (e: string) => e,
      name: "name",
      placeholder: props.name,
      disabled: true,
    },
    {
      type: "password",
      onChange: auth.setPassword ? auth.setPassword : (e: string) => e,
      name: "password",
      placeholder: props.password,
      disabled: true,
    },
  ];
}
