import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { Suspense } from "react";
import { HomeRoutes } from "./middleware/variables/Routes";
import { Auth } from "./Pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRoutes />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer closeOnClick theme="dark" />
    </Suspense>
  );
}
