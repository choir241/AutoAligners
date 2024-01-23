import React from "react";
import { Link } from "react-router-dom";
import { ButtonLinkInterface } from "../middleware/Interfaces";

export function ButtonLink(props: ButtonLinkInterface): React.JSX.Element {
  return (
    <Link className={`${props.classNames}`} to={`${props.domain}`}>
      {props.text}
    </Link>
  );
}
