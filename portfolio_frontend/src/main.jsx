import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              marginBottom: "80px", // adjust based on your layout
            },
          }}
        />
        <App />
      </>
    </StrictMode>
  </BrowserRouter>,
);
