import { FaMoon } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";
import { useContext } from "react";
import { DarkModeContext } from "../middleware/Context";

export default function DarkMode() {
  const { toggleDarkMode, setToggleDarkMode } = useContext(DarkModeContext);

  return (
    <div>
      {toggleDarkMode === "light" ? (
        <MdWbSunny
          className={`button cursor-pointer ${toggleDarkMode === "light" ? "lightBtn" : "darkBtn"}`}
          onClick={() => setToggleDarkMode("dark")}
        />
      ) : (
        <FaMoon
          className="button cursor-pointer"
          onClick={() => setToggleDarkMode("light")}
        />
      )}
    </div>
  );
}
