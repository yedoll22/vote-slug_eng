import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "../src/store/store.js";
import { Provider } from "react-redux";
import Token from "./components/Token";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
