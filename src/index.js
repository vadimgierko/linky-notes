import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom"; // CHANGE TO HASHROUTER BEFORE DEPLOYING GH-PAGES !!!
import "bootstrap/dist/css/bootstrap.css";
//import "bootstrap-icons/font/bootstrap-icons.css"; //doesn't work for some unknown reason...
import "./styles.css";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
  rootElement
);