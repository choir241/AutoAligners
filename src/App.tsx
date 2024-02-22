import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { Suspense } from "react";
import HomeRoutes from "./middleware/variables/Routes";
import PublicRoutes from "./middleware/variables/Routes";
import { AuthPaths } from "./Pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomeRoutes />} />
            <Route element = {<PublicRoutes/>}>
              <Route path="/demo" element={<AuthPaths.Demo />} />
              <Route path="/login" element={<AuthPaths.Login />} />
              <Route path="/admin-demo" element={<AuthPaths.Admin />} />
            </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer closeOnClick theme="dark" />
    </Suspense>
  );
}
