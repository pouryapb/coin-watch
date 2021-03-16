import React, { useEffect, useState } from "react";
import Chart, {
  CommonSeriesSettings,
  Series,
  Reduction,
  ArgumentAxis,
  Label,
  Format,
  ValueAxis,
  Title,
  Tooltip,
  ZoomAndPan,
  Legend,
  LoadingIndicator,
} from "devextreme-react/chart";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import {
  Button,
  Grid,
  IconButton,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ShowChart, ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
import { red, green } from "@material-ui/core/colors";

import coinGecko from "../API/coinGecko";

const useStyle = makeStyles((theme) => ({
  chartChangeBtnUnchecked: {
    background: theme.palette.grey[300],
    borderRadius: "10%",
    "&:hover": {
      background: theme.palette.grey[400],
    },
  },
  chartChangeBtnChecked: {
    background: theme.palette.info.light,
    borderRadius: "10%",
    "&:hover": {
      background: theme.palette.info.main,
    },
  },
  daysSelected: {
    background: theme.palette.info.light,
    "&:hover": {
      background: theme.palette.info.light,
    },
  },
}));

const ChartComponent = ({ coin, currency }) => {
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [line, setLine] = useState(false);
  const [daysSelected, setDaysSelected] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [marketData, setMarketData] = useState({});

  const classes = useStyle();
  const formats = [
    "HH:mm",
    "MMM dd\nHH:mm",
    "MMM dd\nHH:mm",
    "MMM dd",
    "MMM dd",
    "MMM dd",
  ];
  const CurrencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 2,
  });
  const percentFormatter = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 2,
    style: "percent",
  });

  useEffect(() => {
    setIsLoading(true);
    const days = [1, 7, 30, 180, 365, "max"];

    const fetchData = async () => {
      const [data, market] = await Promise.all([
        coinGecko.get(`/coins/${coin}/ohlc`, {
          params: {
            vs_currency: currency,
            days: days[daysSelected.indexOf(true)],
          },
        }),
        coinGecko.get(`/coins/${coin}`, {
          params: {
            localization: false,
            tickers: false,
            market_data: true,
            community_data: false,
            developer_data: false,
            sparkline: false,
          },
        }),
      ]);

      const mappedData = data.data.map((value) => {
        return {
          date: new Date(value[0]),
          o: value[1],
          h: value[2],
          l: value[3],
          c: value[4],
        };
      });
      setMarketData(market.data);
      setDataSource(mappedData);
      setIsLoading(false);
    };
    fetchData();
  }, [coin, currency, daysSelected]);

  const customizeTooltip = (arg) => {
    const text =
      `<div><b>${arg.originalArgument.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
        hourCycle: "h23",
      })}</b><br/><br/>` +
      (arg.openValue
        ? `<b>Open:</b> ${CurrencyFormatter.format(arg.openValue)}<br/>
<b>Close:</b> ${CurrencyFormatter.format(arg.closeValue)}<br/>
<b>High:</b> ${CurrencyFormatter.format(arg.highValue)}<br/>
<b>Low:</b> ${CurrencyFormatter.format(arg.lowValue)}</div>`
        : `<b>Price:</b> ${CurrencyFormatter.format(arg.value)}</div>`);
    return {
      html: text,
    };
  };

  const btnToggle = () => {
    setLine(!line);
  };

  const changeDays = (index) => {
    const res = daysSelected.map((value, i) => {
      return i === index ? true : false;
    });
    setDaysSelected(res);
  };

  return (
    <React.Fragment>
      {isLoading && <LinearProgress />}
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography>
            {marketData.market_data &&
              CurrencyFormatter.format(
                marketData.market_data.current_price[currency]
              )}
          </Typography>
          <Typography
            style={{
              display: "flex",
              color:
                marketData.market_data &&
                (marketData.market_data.price_change_percentage_24h >= 0
                  ? green[400]
                  : red[400]),
            }}
          >
            {marketData.market_data &&
              percentFormatter.format(
                marketData.market_data.price_change_percentage_24h / 100
              )}
            {marketData.market_data &&
              (marketData.market_data.price_change_percentage_24h >= 0 ? (
                <ArrowDropUp />
              ) : (
                <ArrowDropDown />
              ))}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            size="small"
            disableRipple
            className={
              line
                ? classes.chartChangeBtnChecked
                : classes.chartChangeBtnUnchecked
            }
            onClick={btnToggle}
          >
            <ShowChart />
          </IconButton>
        </Grid>
      </Grid>
      <Chart
        id="chart"
        theme="generic.light"
        title={marketData.name && marketData.name + " Price"}
        dataSource={dataSource}
      >
        <LoadingIndicator show={isLoading} />
        <CommonSeriesSettings
          argumentField="date"
          type={line ? "" : "candlestick"}
        />
        <Series
          name={marketData.name}
          openValueField="o"
          highValueField="h"
          lowValueField="l"
          closeValueField="c"
          valueField="c"
        >
          <Reduction color="red" />
        </Series>
        <ArgumentAxis>
          <Label format={formats[daysSelected.indexOf(true)]} />
        </ArgumentAxis>
        <ValueAxis position="right">
          <Title text={currency.toUpperCase()} />
          <Label>
            <Format
              precision={
                marketData.market_data &&
                (marketData.market_data.current_price[currency] > 100 ? 0 : 2)
              }
              type="currency"
              currency={currency}
            />
          </Label>
        </ValueAxis>
        <Tooltip
          enabled={true}
          location="edge"
          customizeTooltip={customizeTooltip}
        />
        <Legend visible={false} />
        <ZoomAndPan argumentAxis="both" />
      </Chart>
      <br />
      <Grid container spacing={2}>
        {["1D", "7D", "1M", "6M", "1Y", "All"].map((value, index) => {
          return (
            <Grid item key={index}>
              <Button
                className={daysSelected[index] ? classes.daysSelected : null}
                variant="outlined"
                key={index}
                onClick={changeDays.bind(this, index)}
              >
                {value}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default ChartComponent;
