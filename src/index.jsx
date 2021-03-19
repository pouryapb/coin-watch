import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import ConnectionProvider from "./context/ConnectionContext";

ReactDOM.render(
  <ConnectionProvider>
    <App />
  </ConnectionProvider>,
  document.getElementById("root")
);
