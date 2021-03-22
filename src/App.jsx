import {
  Card,
  CardContent,
  Container,
  Grid,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Brightness4, BrightnessHigh } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";

import coinGecko from "./API/coinGecko";
import ChartComponent from "./components/ChartComponent";
import MarketDetails from "./components/MarketDetails";
import CoinList from "./components/CoinList";
import { ConnectionContext } from "./context/ConnectionContext";

function App() {
  const [marketData, setMarketData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [themeColor, setThemeType] = useState(
    window.localStorage.getItem("theme") || "dark"
  );

  const { coinId } = useContext(ConnectionContext);

  const theme = createMuiTheme({
    palette: {
      type: themeColor,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const market = await coinGecko.get(`/coins/${coinId}`, {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: false,
        },
      });

      setMarketData(market.data);
      setIsLoading(false);
    };

    fetchData();
  }, [coinId]);

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
              {themeColor === "dark" ? <Brightness4 /> : <BrightnessHigh />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container>
          <CssBaseline />
          <Grid container spacing={2} justify="center" direction="row">
            <Grid item xs={12} md={9}>
              <Card style={{ height: "100%", justifyItems: "center" }}>
                <CardContent>
                  <ChartComponent
                    coin={coinId}
                    currency="usd"
                    marketData={marketData}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <MarketDetails
                    marketData={marketData}
                    currency="usd"
                    isLoading={isLoading}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <CoinList currency="usd" />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
