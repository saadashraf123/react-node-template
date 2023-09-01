import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import reportWebVitals from "./reportWebVitals";
import StateContext from "./Context/stateContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <StateContext>
      <App />
    </StateContext>
  </React.StrictMode>
);

serviceWorker.unregister();
reportWebVitals();
