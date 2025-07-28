import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { Pages } from "./pages/Pages";
import { DarkModeContext } from "./middleware/Context";

export default function App() {
  const [toggleDarkMode, setToggleDarkMode] = useState<string>("light");

  return (
    <DarkModeContext.Provider value={{ setToggleDarkMode, toggleDarkMode }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pages.Home />} />
        </Routes>
      </BrowserRouter>
    </DarkModeContext.Provider>
  );
}
