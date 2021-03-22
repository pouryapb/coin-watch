import React, { useEffect, useState } from "react";
import Chart, {
  CommonSeriesSettings,
  Series,
  Reduction,
  ArgumentAxis,
  Label,
  Format,
  ValueAxis,
  Tooltip,
  ZoomAndPan,
  Legend,
  LoadingIndicator,
} from "devextreme-react/chart";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";
import { ShowChart, ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
import { red, green } from "@material-ui/core/colors";

import coinGecko from "../API/coinGecko";

const useStyle = makeStyles((theme) => ({
  chartChangeBtnChecked: {
    color: theme.palette.info.light,
  },
  daysSelected: {
    background: theme.palette.info.light,
    "&:hover": {
      background: theme.palette.info.light,
    },
  },
  daysBtn: {
    paddingLeft: "0.1rem",
    paddingRight: "0.1rem",
    minWidth: "40px",
  },
}));

const ChartComponent = ({ coin, currency, marketData }) => {
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

  const theme = useTheme();
  const classes = useStyle();
  const formats = [
    "HH:mm",
    "HH:mm\nMMM dd",
    "HH:mm\nMMM dd",
    "MMM dd, yyyy",
    "MMM dd, yyyy",
    "MMM dd, yyyy",
  ];
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 6,
  });
  const percentFormatter = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 2,
    style: "percent",
  });

  useEffect(() => {
    setIsLoading(true);
    const days = [1, 7, 30, 180, 365, "max"];

    const fetchData = async () => {
      const data = await coinGecko.get(`/coins/${coin}/ohlc`, {
        params: {
          vs_currency: currency,
          days: days[daysSelected.indexOf(true)],
        },
      });

      const mappedData = data.data.map((value) => {
        return {
          date: new Date(value[0]),
          o: value[1],
          h: value[2],
          l: value[3],
          c: value[4],
        };
      });
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
        ? `<b>Open:</b> ${currencyFormatter.format(arg.openValue)}<br/>
<b>Close:</b> ${currencyFormatter.format(arg.closeValue)}<br/>
<b>High:</b> ${currencyFormatter.format(arg.highValue)}<br/>
<b>Low:</b> ${currencyFormatter.format(arg.lowValue)}</div>`
        : `<b>Price:</b> ${currencyFormatter.format(arg.value)}</div>`);
    return {
      html: text,
    };
  };

  const btnToggle = () => {
    setLine(!line);
  };

  const changeDays = (index) => {
    const res = daysSelected.map((value, i) => {
      return i === index;
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
          <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item>
              <Avatar src={marketData && marketData.image.small} />
            </Grid>
            <Grid item>
              <Typography>
                {marketData &&
                  currencyFormatter.format(
                    marketData.market_data.current_price[currency]
                  )}
              </Typography>
              <Typography
                style={{
                  display: "flex",
                  color:
                    marketData &&
                    (marketData.market_data.price_change_percentage_24h >= 0
                      ? green[400]
                      : red[400]),
                }}
              >
                {marketData &&
                  (marketData.market_data.price_change_percentage_24h >= 0 ? (
                    <ArrowDropUp />
                  ) : (
                    <ArrowDropDown />
                  ))}
                {marketData &&
                  percentFormatter.format(
                    marketData.market_data.price_change_percentage_24h / 100
                  )}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <IconButton
            size="small"
            disableRipple
            className={line ? classes.chartChangeBtnChecked : ""}
            onClick={btnToggle}
          >
            <ShowChart />
          </IconButton>
        </Grid>
      </Grid>
      <Chart
        id="chart"
        theme={`generic.${theme.palette.type}`}
        title={marketData && marketData.name + " Price"}
        dataSource={dataSource}
      >
        <LoadingIndicator show={isLoading} />
        <CommonSeriesSettings
          argumentField="date"
          type={line ? "" : "candlestick"}
        />
        <Series
          name={marketData && marketData.name}
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
        <ValueAxis position="left">
          <Label>
            <Format
              precision={
                marketData &&
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
      <Grid container spacing={1}>
        {["1D", "7D", "1M", "6M", "1Y", "All"].map((value, index) => {
          return (
            <Grid item key={index}>
              <Button
                className={`${classes.daysBtn}${
                  daysSelected[index] ? " " + classes.daysSelected : ""
                }`}
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
