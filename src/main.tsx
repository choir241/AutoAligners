import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import "./css/reset.css"
import "./css/main.css"


const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);