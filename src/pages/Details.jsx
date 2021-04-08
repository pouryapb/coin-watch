import React, { useContext, useEffect, useState } from "react";
import { Grid, Card, CardContent, Container } from "@material-ui/core";

import coinGecko from "../API/coinGecko";
import MarketDetails from "../components/MarketDetails";
import ChartComponent from "../components/ChartComponent";
import { CoinListContext } from "../context/CoinListContext";
import Predictor from "../components/Predictor";

const Details = ({ match }) => {
  const [marketData, setMarketData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { currency } = useContext(CoinListContext);

  const coinId = match.params.coinId;

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
        <Grid item xs={12}>
          <Card style={{ height: "100%", justifyItems: "center" }}>
            <CardContent>
              <ChartComponent
                coin={coinId}
                currency={currency}
                marketData={marketData}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={2} xs={12}>
          <Card style={{ height: "100%", justifyItems: "center" }}>
            <CardContent style={{ height: "100%" }}>
              <Predictor />
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={10} xs={12}>
          <Card style={{ height: "100%" }}>
            <CardContent>
              <MarketDetails
                marketData={marketData}
                currency={currency}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Details;
