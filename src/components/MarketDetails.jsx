import { Divider, Grid, LinearProgress, Typography } from "@material-ui/core";
import { ArrowDropUp, ArrowDropDown } from "@material-ui/icons";
import { red, green } from "@material-ui/core/colors";
import React from "react";

const MarketDetails = ({ marketData, currency }) => {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 6,
  });
  const percentFormatter = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 2,
    style: "percent",
  });
  const coinFormatter = new Intl.NumberFormat();

  const content =
    (marketData.market_data && [
      [
        {
          name: "Market Cap",
          value: currencyFormatter.format(
            marketData.market_data.market_cap[currency]
          ),
          percent: percentFormatter.format(
            marketData.market_data.market_cap_change_percentage_24h / 100
          ),
        },
        {
          name: "All Time High",
          value: currencyFormatter.format(marketData.market_data.ath[currency]),
          percent: percentFormatter.format(
            marketData.market_data.ath_change_percentage[currency] / 100
          ),
        },
        {
          name: "All Time Low",
          value: currencyFormatter.format(marketData.market_data.atl[currency]),
          percent: percentFormatter.format(
            marketData.market_data.atl_change_percentage[currency] / 100
          ),
        },
        {
          name: "Volume",
          value: currencyFormatter.format(
            marketData.market_data.total_volume[currency]
          ),
        },
        {
          name: "Circulating Supply",
          value: `${coinFormatter.format(
            marketData.market_data.circulating_supply
          )} ${marketData.symbol.toUpperCase()}`,
        },
        {
          name: "Fully Diluted Valuation",
          value:
            (marketData.market_data.fully_diluted_valuation[currency] &&
              currencyFormatter.format(
                marketData.market_data.fully_diluted_valuation[currency]
              )) ||
            "--",
        },
      ],
    ]) ||
    [];

  return (
    <React.Fragment>
      {!marketData.market_data && <LinearProgress />}
      {content.map((row, index) => {
        return (
          <Grid
            container
            direction="column"
            justify="space-between"
            key={index}
            spacing={3}
          >
            {marketData.market_data &&
              row.map((item, index) => {
                return (
                  <Grid item key={index}>
                    <Typography variant="subtitle2" display="block">
                      {item.name}
                    </Typography>
                    <Typography variant="h6" display="block">
                      {item.value}
                    </Typography>
                    {item.percent && (
                      <Typography
                        variant="caption"
                        style={{
                          display: "flex",
                          color: item.percent >= 0 ? green[400] : red[400],
                        }}
                      >
                        {item.percent >= 0 ? (
                          <ArrowDropUp />
                        ) : (
                          <ArrowDropDown />
                        )}
                        {item.percent}
                      </Typography>
                    )}
                    {index < row.length - 1 && <Divider variant="fullWidth" />}
                  </Grid>
                );
              })}
          </Grid>
        );
      })}
    </React.Fragment>
  );
};

export default MarketDetails;
