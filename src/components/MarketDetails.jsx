import {
  Divider,
  Grid,
  LinearProgress,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { ArrowDropUp, ArrowDropDown } from "@material-ui/icons";
import { red, green } from "@material-ui/core/colors";
import React from "react";

const MarketDetails = ({ marketData, currency, isLoading }) => {
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
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));

  const content = [
    [
      {
        name: "Market Cap",
        value:
          (!isLoading &&
            currencyFormatter.format(
              marketData.market_data.market_cap[currency]
            )) ||
          "--",
        percent:
          (!isLoading &&
            percentFormatter.format(
              marketData.market_data.market_cap_change_percentage_24h / 100
            )) ||
          "--",
      },
      {
        name: "All Time High",
        value:
          (!isLoading &&
            currencyFormatter.format(marketData.market_data.ath[currency])) ||
          "--",
        percent:
          (!isLoading &&
            percentFormatter.format(
              marketData.market_data.ath_change_percentage[currency] / 100
            )) ||
          "--",
      },
      {
        name: "All Time Low",
        value:
          (!isLoading &&
            currencyFormatter.format(marketData.market_data.atl[currency])) ||
          "--",
        percent:
          (!isLoading &&
            percentFormatter.format(
              marketData.market_data.atl_change_percentage[currency] / 100
            )) ||
          "--",
      },
      {
        name: "Volume",
        value:
          (!isLoading &&
            currencyFormatter.format(
              marketData.market_data.total_volume[currency]
            )) ||
          "--",
      },
      {
        name: "Circulating Supply",
        value: `${
          !isLoading
            ? coinFormatter.format(marketData.market_data.circulating_supply) +
              " "
            : "-"
        }${!isLoading ? marketData.symbol.toUpperCase() : "-"}`,
      },
      {
        name: "Fully Diluted Valuation",
        value:
          (!isLoading &&
            marketData.market_data.fully_diluted_valuation[currency] &&
            !isLoading &&
            currencyFormatter.format(
              marketData.market_data.fully_diluted_valuation[currency]
            )) ||
          "--",
      },
    ],
  ];

  return (
    <React.Fragment>
      {isLoading && <LinearProgress />}
      {content.map((row, index) => {
        return (
          <Grid
            container
            direction="row"
            justify="space-between"
            key={index}
            spacing={3}
          >
            {row.map((item, index) => {
              return (
                <Grid md={4} xs={12} item key={index}>
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
                        color:
                          !isLoading &&
                          (item.percent >= 0 ? green[400] : red[400]),
                      }}
                    >
                      {!isLoading &&
                        (item.percent >= 0 ? (
                          <ArrowDropUp />
                        ) : (
                          <ArrowDropDown />
                        ))}
                      {item.percent}
                    </Typography>
                  )}
                  {isSmallScreen && index < row.length - 1 && (
                    <Divider variant="fullWidth" />
                  )}
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
