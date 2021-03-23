import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";

import CoinList from "./pages/CoinList";
import Details from "./pages/Details";
import CustomAppBar from "./components/CustomAppBar";

function App() {
  const [themeType, setThemeType] = useState(
    window.localStorage.getItem("theme") || "dark"
  );

  const theme = createMuiTheme({
    palette: {
      type: themeType,
    },
  });

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CustomAppBar themeType={themeType} setThemeType={setThemeType} />
          <CssBaseline />
          <Switch>
            <Route exact path="/coin-watch" component={CoinList} />
            <Route path="/coin-watch/:coinId" component={Details} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
