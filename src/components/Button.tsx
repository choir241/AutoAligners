import React from "react";
import { Link } from "react-router-dom";
import {
  ButtonLinkInterface,
  ButtonInterface,
} from "../middleware/interfaces/component";

export function ButtonLink(button: ButtonLinkInterface): React.JSX.Element {
  return (
    <Link
      key={button.key}
      className={`${button.classNames}`}
      to={`${button.domain}`}
    >
      {button.text}
    </Link>
  );
}

export function Button(button: ButtonInterface) {
  return (
    <button
      className={button.classNames}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        button.onClick(e);
      }}
    >
      {button.text}
    </button>
  );
}
