import { ButtonLinkInterface } from "../middleware/interfaces/component";
import { getYear } from "./Dates";

const Footer = () => {
  const socialMedias = [
    {
      domain: "https://twitter.com/choir241",
      classNames: "fa-brands fa-twitter",
      text: "Twitter",
    },
    {
      domain: "https://www.linkedin.com/in/richard-choir/",
      classNames: "fa-brands fa-linkedin",
      text: "LinkedIn",
    },
    {
      domain: "https://www.instagram.com/225kh_drw/?hl=en",
      classNames: "fa-brands fa-instagram",
      text: "Instagram",
    },
    {
      domain: "https://github.com/choir27",
      classNames: "fa-brands fa-github",
      text: "Github",
    },
  ];

  return (
    <footer className="flex alignEnd">
      <nav className="flex justifyBetween">
        <ul className="flex justifyAround">
          {socialMedias.map((social: ButtonLinkInterface) => {
            return (
              <li key={social.domain}>
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={social.domain}
                  className={social.classNames}
                >
                  <p className="displayNone">{social.text}</p>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <small>AutoAligners &copy; {getYear()}. All rights are reserved</small>
    </footer>
  );
};

export default Footer;
