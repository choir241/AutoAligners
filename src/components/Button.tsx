import React from "react";
import { Link } from "react-router-dom";
import {
  ButtonProps,
  ButtonSubmitProps,
  ButtonLinkProps,
} from "../middleware/Interfaces";

export function ButtonSubmit(props: ButtonSubmitProps) {
  return (
    <button
      className="button"
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        props.handleButtonClick(e);
      }}
    >
      {props.text}
    </button>
  );
}

export function Button(props: ButtonProps) {
  return (
    <button
      key={props.key}
      className={`button ${props.classNames}`}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        props.handleButtonClick(e);
      }}
    >
      {props.text}
    </button>
  );
}

export function ButtonLink(props: ButtonLinkProps): React.JSX.Element {
  return (
    <Link className={`button ${props.classNames}`} to={`${props.domain}`}>
      {props.text}
    </Link>
  );
}
