import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  LinearProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { ArrowDropUp, ArrowDropDown } from "@material-ui/icons";
import { red, green } from "@material-ui/core/colors";

import coinGecko from "../API/coinGecko";
import { ConnectionContext } from "../context/ConnectionContext";

const useStyle = makeStyles({
  selected: {
    backgroundColor: "rgba(100, 181, 246, 0.3)!important",
  },
});

const createData = (
  id,
  rank,
  image,
  name,
  price,
  priceChange,
  marketCap,
  volume
) => {
  return {
    id,
    rank,
    image,
    name,
    price,
    priceChange,
    marketCap,
    volume,
    isSelected: false,
  };
};

const WatchList = ({ currency }) => {
  const [list, setList] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  const { setCoinId } = useContext(ConnectionContext);

  const classes = useStyle();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const markets = await coinGecko.get("/coins/markets", {
        params: {
          vs_currency: currency,
          order: "market_cap_desc",
          per_page: perPage,
          page: page,
          price_change_percentage: "24h",
        },
      });

      const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 6,
      });
      const percentFormatter = new Intl.NumberFormat(undefined, {
        maximumFractionDigits: 2,
        style: "percent",
      });

      setList(
        markets.data.map((item) => {
          return createData(
            item.id,
            item.market_cap_rank,
            item.image,
            item.name,
            currencyFormatter.format(item.current_price),
            percentFormatter.format(item.price_change_percentage_24h / 100),
            currencyFormatter.format(item.market_cap),
            currencyFormatter.format(item.total_volume)
          );
        })
      );

      setIsLoading(false);
    };

    fetchData();
  }, [currency, page, perPage]);

  const changePageHandler = (event, newPage) => {
    setPage(newPage + 1);
  };

  const changeRowPerPageHandler = (event) => {
    setPerPage(event.target.value);
    setPage(1);
  };

  const rowClickHandler = (event, index) => {
    const newList = list.map((value, i) => {
      return i === index
        ? { ...value, isSelected: true }
        : { ...value, isSelected: false };
    });
    setList(newList);
    setCoinId(newList[index].id);
  };

  return (
    <React.Fragment>
      {isLoading && <LinearProgress />}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell></TableCell>
              <TableCell>name</TableCell>
              <TableCell>price</TableCell>
              <TableCell>24h %</TableCell>
              <TableCell>market cap</TableCell>
              <TableCell>volume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list &&
              list.map((listItem, index) => {
                return (
                  <TableRow
                    key={listItem.rank}
                    hover
                    onClick={(event) => rowClickHandler(event, index)}
                    selected={listItem.isSelected}
                    classes={{
                      selected: classes.selected,
                    }}
                  >
                    <TableCell>{listItem.rank}</TableCell>
                    <TableCell>
                      <Avatar src={listItem.image} />
                    </TableCell>
                    <TableCell>{listItem.name}</TableCell>
                    <TableCell>{listItem.price}</TableCell>
                    <TableCell>
                      <span
                        style={{
                          display: "flex",
                          color:
                            listItem.priceChange.slice(0, -1) >= 0
                              ? green[400]
                              : red[400],
                        }}
                      >
                        {listItem.priceChange.slice(0, -1) >= 0 ? (
                          <ArrowDropUp />
                        ) : (
                          <ArrowDropDown />
                        )}
                        {listItem.priceChange}
                      </span>
                    </TableCell>
                    <TableCell>{listItem.marketCap}</TableCell>
                    <TableCell>{listItem.volume}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[10, 25, 50, 100]}
        count={200}
        rowsPerPage={perPage}
        page={page - 1}
        onChangePage={changePageHandler}
        onChangeRowsPerPage={changeRowPerPageHandler}
      />
    </React.Fragment>
  );
};

export default WatchList;