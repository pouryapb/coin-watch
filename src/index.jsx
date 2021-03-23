import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CoinListProvider from "./context/CoinListContext";

ReactDOM.render(
  <CoinListProvider>
    <App />
  </CoinListProvider>,
  document.getElementById("root")
);
