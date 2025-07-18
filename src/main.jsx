import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      position="bottom-right"
      gutter={16}
      toastOptions={{ duration: 3000 }}
    />
    <App />
  </StrictMode>
);
