import React, { useContext } from "react";
import { useHistory } from "react-router";
import {
  Avatar,
  Card,
  CardContent,
  Container,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { ArrowDropUp, ArrowDropDown } from "@material-ui/icons";
import { red, green } from "@material-ui/core/colors";

import { CoinListContext } from "../context/CoinListContext";

const WatchList = () => {
  const {
    isLoading,
    list,
    page,
    perPage,
    setPage,
    setPerPage,
    activeCryptos,
  } = useContext(CoinListContext);

  const history = useHistory();

  const changePageHandler = (event, newPage) => {
    setPage(newPage);
  };

  const changeRowPerPageHandler = (event) => {
    setPerPage(event.target.value);
    setPage(0);
  };

  const redirect = (event, id) => {
    history.push(`/coin-watch/${id}`);
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sortDirection="asc">#</TableCell>
                  <TableCell></TableCell>
                  <TableCell>name</TableCell>
                  <TableCell>price</TableCell>
                  <TableCell>24h %</TableCell>
                  <TableCell>market cap</TableCell>
                  <TableCell>volume</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((listItem) => {
                  return (
                    <TableRow
                      key={listItem.rank}
                      hover
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={(event) => redirect(event, listItem.id)}
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
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 50, 100, 250]}
                    count={activeCryptos}
                    rowsPerPage={perPage}
                    page={page}
                    onChangePage={changePageHandler}
                    onChangeRowsPerPage={changeRowPerPageHandler}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          {isLoading && <LinearProgress />}
        </CardContent>
      </Card>
    </Container>
  );
};

export default WatchList;
