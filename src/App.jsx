import { Card, CardContent, Container, Grid } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";

import coinGecko from "./API/coinGecko";
import ChartComponent from "./components/ChartComponent";
import MarketDetails from "./components/MarketDetails";
import CoinList from "./components/CoinList";
import { ConnectionContext } from "./context/ConnectionContext";

function App() {
  const [marketData, setMarketData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { coinId } = useContext(ConnectionContext);

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

  return (
    <Container>
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
  );
}

export default App;
