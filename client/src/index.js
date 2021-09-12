import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import Signin from "./components/Signin";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/* <Route exact path="/" component={App} />
      <Route exact path="/signin" component={Signin} /> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
