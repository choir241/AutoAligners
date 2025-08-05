import { useContext } from "react";
import { Link } from "react-router-dom";
import { IButtonLink } from "../../interfaces/Inputs";
import { DarkModeContext } from "../../middleware/Context";

export default function ButtonLink(props: IButtonLink): React.JSX.Element {
  const { toggleDarkMode } = useContext(DarkModeContext);

  return (
    <Link
      className={`button ${props.classNames} ${toggleDarkMode === "light" ? "lightBtn" : "darkBtn"}`}
      to={`${props.domain}`}
    />
  );
}
