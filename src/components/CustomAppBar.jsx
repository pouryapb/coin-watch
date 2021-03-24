import {
  AppBar,
  Avatar,
  fade,
  FormControl,
  IconButton,
  InputBase,
  List,
  ListItem,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import { Brightness4, BrightnessHigh, Search } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import coinGecko from "../API/coinGecko";
import { CoinListContext } from "../context/CoinListContext";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(1),
    width: "100%",
    [theme.breakpoints.up("xs")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("xs")]: {
      width: "8ch",
      "&:focus": {
        width: "15ch",
      },
    },
  },
}));

const CustomAppBar = ({ themeType, setThemeType }) => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const { search, currency, setCurrency } = useContext(CoinListContext);

  const [searchResults, setSearchResults] = useState([]);
  const [openResult, setOpenResult] = useState(false);
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const [currencyList, setCurrencyList] = useState([currency]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await coinGecko.get("/simple/supported_vs_currencies");

      setCurrencyList(data.data);
    };

    fetchData();
  }, []);

  const changeTheme = (event) => {
    const type = themeType === "dark" ? "light" : "dark";
    window.localStorage.setItem("theme", type);
    setThemeType(type);
  };

  const searchHandler = (event) => {
    const prefix = event.target.value;
    setSearchBoxValue(prefix);

    const results = search(prefix);

    if (prefix.length < 2 || results.length === 0) {
      setOpenResult(false);
      setSearchResults([]);
      return;
    }

    setSearchResults(results.slice(0, 10));
    setOpenResult(true);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value.toLowerCase());
  };

  return (
    <AppBar
      color="default"
      position="sticky"
      style={{ marginBottom: theme.spacing(1) }}
    >
      <Toolbar>
        <Typography
          style={{
            flexGrow: 1,
            cursor: "pointer",
          }}
          onClick={() => history.push("/coin-watch")}
        >
          Coin Watch
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <Search />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            onChange={searchHandler}
            value={searchBoxValue}
          />
          <pre
            style={{
              position: "absolute",
              width: "100%",
              display: openResult ? "block" : "none",
            }}
          >
            <Paper elevation={3}>
              <List>
                {searchResults.map((value, index) => {
                  return (
                    <ListItem
                      key={index}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        history.push(`/coin-watch/${value.id}`);
                        setOpenResult(false);
                        setSearchBoxValue("");
                      }}
                    >
                      <Avatar
                        //src={value.image}
                        style={{
                          marginRight: theme.spacing(1),
                          fontSize: theme.spacing(2),
                        }}
                      >
                        {value.symbol}
                      </Avatar>
                      <Typography variant="caption" noWrap>
                        {value.name}
                      </Typography>
                    </ListItem>
                  );
                })}
              </List>
            </Paper>
          </pre>
        </div>
        <FormControl>
          <Select
            value={currency.toUpperCase()}
            onChange={handleCurrencyChange}
            className={classes.selectEmpty}
            inputProps={{ "aria-label": "Without label" }}
          >
            {currencyList.map((value, index) => {
              if (value.length > 3) return null;
              const capsValue = value.toUpperCase();
              return (
                <MenuItem key={index} value={capsValue}>
                  {capsValue}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <IconButton onClick={changeTheme}>
          {themeType !== "dark" ? <Brightness4 /> : <BrightnessHigh />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
