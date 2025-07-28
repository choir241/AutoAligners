import React, { useContext } from "react";
import { IButtonSubmit } from "../../interfaces/Inputs";
import { DarkModeContext } from "../../middleware/Context";

export default function ButtonSubmit(props: IButtonSubmit) {
  const { toggleDarkMode } = useContext(DarkModeContext);

  return (
    <button
      className={`button ${props.className} ${toggleDarkMode === "light" ? "lightBtn" : "darkBtn"}`}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        props.handleButtonClick(e);
      }}
    >
      {props.text}
    </button>
  );
}
