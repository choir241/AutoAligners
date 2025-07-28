import { getYear } from "../api/dates";
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { DarkModeContext } from "../middleware/Context";
import { useContext } from "react";

const Footer = () => {
  const { toggleDarkMode } = useContext(DarkModeContext);

  return (
    <footer
      className={`w-full mt-6 bg-nav ${toggleDarkMode === "dark" ? "bg-nav" : "darkNav"}`}
    >
      <nav className="flex justify-between items-center w-full">
        <ul className="flex justify-between w-20 p-2">
          <li>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://twitter.com/choir241"
            >
              <FaTwitter className="icons" />
              <p className="hidden">Twitter</p>
            </a>
          </li>

          <li>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.linkedin.com/in/richard-choir/"
            >
              <FaLinkedin className="icons" />
              <p className="hidden">LinkedIn</p>
            </a>
          </li>

          <li>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.instagram.com/225kh_drw/?hl=en"
            >
              <FaInstagram className="icons" />
              <p className="hidden">Instagram</p>
            </a>
          </li>

          <li>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://github.com/choir241"
            >
              <FaGithub className="icons" />
              <p className="hidden">Github</p>
            </a>
          </li>
        </ul>

        <small className="p-2">
          AutoAligners &copy; {getYear()}. All rights are reserved
        </small>
      </nav>
    </footer>
  );
};

export default Footer;
