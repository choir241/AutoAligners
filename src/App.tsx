import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { useState, Suspense } from "react";
import { Pages } from "./pages/Pages";
import { DarkModeContext } from "./middleware/Context";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

export default function App() {
  const [toggleDarkMode, setToggleDarkMode] = useState<string>("light");

  return (
    <DarkModeContext.Provider value={{ setToggleDarkMode, toggleDarkMode }}>
      <Suspense fallback={<h1>Loading...</h1>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Pages.Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </DarkModeContext.Provider>
  );
}
