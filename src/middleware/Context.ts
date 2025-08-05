import { createContext } from "react";

type TToggleDarkMode = {
  toggleDarkMode: string;
  setToggleDarkMode: (e: string) => void;
};

export const DarkModeContext = createContext<TToggleDarkMode>({
  toggleDarkMode: "",
  setToggleDarkMode: (e: string) => e,
});
