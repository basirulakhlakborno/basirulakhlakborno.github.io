import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Site } from "./components/Site";
import "./style.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element #root was not found");

createRoot(root).render(
  <StrictMode>
    <Site />
  </StrictMode>,
);
