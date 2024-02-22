import { ButtonLink } from "../../components/Button";
import { ButtonLinkInterface } from "../../middleware/variables/Interfaces";
import { buttons } from "./Demo-Variables";

export default function Auth() {
  return (
    <section id="employee">
      <ul className="flex justifyBetween flex-col">
        {buttons.map((button: ButtonLinkInterface) => {
          return (
            <li className="textAlignCenter" key= {button.domain}>
              {ButtonLink({
                domain: button.domain,
                text: button.text,
                classNames: button.classNames,
              })}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
