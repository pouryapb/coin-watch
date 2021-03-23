import {
  AppBar,
  Avatar,
  Container,
  fade,
  IconButton,
  InputBase,
  List,
  ListItem,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import { Brightness4, BrightnessHigh, Search } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { CoinListContext } from "../context/CoinListContext";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
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
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const CustomAppBar = ({ themeType, setThemeType }) => {
  const classes = useStyles();
  const { search } = useContext(CoinListContext);

  const [searchResults, setSearchResults] = useState([]);
  const [openResult, setOpenResult] = useState(false);
  const [searchBoxValue, setSearchBoxValue] = useState("");

  const history = useHistory();
  const theme = useTheme();

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

  return (
    <AppBar
      color="default"
      position="sticky"
      style={{ marginBottom: theme.spacing(1) }}
    >
      <Container>
        <Toolbar>
          <Typography
            style={{ flexGrow: 1, cursor: "pointer" }}
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
                          src={value.image}
                          style={{
                            marginRight: theme.spacing(1),
                          }}
                        />
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
          <IconButton onClick={changeTheme}>
            {themeType !== "dark" ? <Brightness4 /> : <BrightnessHigh />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default CustomAppBar;
