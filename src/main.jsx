import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Stair from "./Components/Common/Stair.jsx";
import NavContext from "./Components/Context/NavContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Stair>
        <NavContext>
          <App />
        </NavContext>
      </Stair>
    </BrowserRouter>
  </StrictMode>
);
