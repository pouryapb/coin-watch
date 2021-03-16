import { Card, CardContent, Container } from "@material-ui/core";
import { useEffect, useState } from "react";

import coinGecko from "./API/coinGecko";
import ChartComponent from "./components/ChartComponent";
import MarketDetails from "./components/MarketDetails";

function App() {
  const [marketDate, setMarketDate] = useState({});

  const coin = "bitcoin";

  useEffect(() => {
    const fetchData = async () => {
      const market = await coinGecko.get(`/coins/${coin}`, {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: false,
        },
      });

      setMarketDate(market.data);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Card>
        <CardContent>
          <ChartComponent coin={coin} currency="usd" marketData={marketDate} />
        </CardContent>
      </Card>
      <br />
      <br />
      <Card>
        <CardContent>
          <MarketDetails marketData={marketDate} currency="usd" />
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
