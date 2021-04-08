import React, { useEffect, useState } from "react";
import { Skeleton, ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import predictor from "../API/predictor";
import {
  Grid,
  LinearProgress,
  Tooltip,
  Typography,
  withStyles,
} from "@material-ui/core";

const StyledLinearProgress = withStyles((theme) => ({
  root: {
    height: 20,
    borderRadius: 3,
  },
  colorPrimary: {
    backgroundColor: theme.palette.error.main,
  },
  bar: {
    backgroundColor: theme.palette.success.main,
  },
}))(LinearProgress);

const percentFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 2,
  style: "percent",
});

const Predictor = () => {
  const [m, setM] = useState({});
  const [h, setH] = useState({});
  const [mode, setMode] = useState("minutly");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const m = await predictor.get("/m").then((result) => result.data);
      const h = await predictor.get("/h").then((result) => result.data);

      setM(m);
      setH(h);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <React.Fragment>
      <Skeleton />
      <Skeleton />
      <Skeleton variant="rect" height={30} />
      <Skeleton />
      <Skeleton />
      <Skeleton variant="rect" height={50} />
    </React.Fragment>
  ) : (
    <Grid
      container
      justify="space-between"
      direction="column"
      style={{ height: "100%" }}
    >
      <Grid item>
        <Typography
          variant="h6"
          style={{ textAlign: "center", marginBottom: "1.5rem" }}
        >
          Price Prediction
        </Typography>
        <Grid container direction="row" justify="space-between">
          <Grid item>
            <Typography variant="caption">Going Up</Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">Going Down</Typography>
          </Grid>
        </Grid>
      </Grid>
      <StyledLinearProgress
        variant="determinate"
        value={
          mode === "minutly"
            ? m.nextPrediction.up * 100
            : h.nextPrediction.up * 100
        }
      />
      <Grid container direction="row" justify="space-between">
        <Grid item>
          <Typography variant="caption">
            {percentFormatter.format(
              mode === "minutly" ? m.nextPrediction.up : h.nextPrediction.up
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption">
            {percentFormatter.format(
              mode === "minutly" ? m.nextPrediction.down : h.nextPrediction.down
            )}
          </Typography>
        </Grid>
        <Typography color="error" variant="body2">
          Accuracy:{" "}
          {percentFormatter.format(
            mode === "minutly"
              ? m.rightGuess / m.allGuess
              : h.rightGuess / h.allGuess
          )}
        </Typography>
      </Grid>
      <Grid item style={{ alignSelf: "center" }}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(event, newMode) => setMode(newMode)}
          style={{ width: "100%", marginTop: "1.5rem" }}
        >
          <ToggleButton value="minutly">
            <Tooltip title="varies from 1-10 minutes">
              <span>Minutly</span>
            </Tooltip>
          </ToggleButton>
          <ToggleButton value="hourly">
            <Tooltip title="varies from 1-1.5 hours">
              <span>Hourly</span>
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
};

export default Predictor;
