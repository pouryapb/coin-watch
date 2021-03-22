import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Brightness4, BrightnessHigh } from "@material-ui/icons";

import CoinList from "./pages/CoinList";
import Details from "./pages/Details";

function App() {
  const [themeColor, setThemeType] = useState(
    window.localStorage.getItem("theme") || "dark"
  );

  const theme = createMuiTheme({
    palette: {
      type: themeColor,
    },
  });

  const changeTheme = (event) => {
    const type = themeColor === "dark" ? "light" : "dark";
    window.localStorage.setItem("theme", type);
    setThemeType(type);
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <AppBar
          color="default"
          position="sticky"
          style={{ marginBottom: theme.spacing(1) }}
        >
          <Toolbar variant="dense">
            <Typography style={{ flexGrow: 1 }}>Coin Watch</Typography>
            <IconButton onClick={changeTheme}>
              {themeColor !== "dark" ? <Brightness4 /> : <BrightnessHigh />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/coin-watch"
              render={(props) => <CoinList currency="usd" {...props} />}
            />
            <Route path="/coin-watch/:coinId" component={Details} />
          </Switch>
        </BrowserRouter>
        {/* <Container>
          <Details
            coinId={coinId}
            marketData={marketData}
            isLoading={isLoading}
          />
          <Card>
            <CardContent>
              <CoinList currency="usd" />
            </CardContent>
          </Card>
        </Container> */}
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
