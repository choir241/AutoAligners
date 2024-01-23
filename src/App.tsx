import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { Suspense } from "react";
import { HomeRoutes } from "./middleware/Routes";

export default function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRoutes />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
