import { DarkModeContext } from "../../middleware/Context";
import { useContext } from "react";

export default function ButtonText({
  label,
  className,
  onClickEventHandler,
}: {
  label: string;
  className?: string;
  onClickEventHandler: () => void;
}) {
  const { toggleDarkMode } = useContext(DarkModeContext);

  return (
    <button
      className={`button ${className} ${toggleDarkMode === "light" ? "lightBtn" : "darkBtn"}`}
      onClick={onClickEventHandler}
    >
      {label}
    </button>
  );
}
