import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import Auth from "./components/Auth";

ReactDOM.render(
  <BrowserRouter>
    <App />
    {/* <Route exact path="/" component={App} />
    <Route exact path="/signin" component={Auth} /> */}
  </BrowserRouter>,

  document.getElementById("root")
);

reportWebVitals();
