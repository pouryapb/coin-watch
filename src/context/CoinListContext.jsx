import React, { useEffect, useState } from "react";
import coinGecko from "../API/coinGecko";

export const CoinListContext = React.createContext(null);

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
  };
};

const CoinListProvider = ({ children }) => {
  const [currency, setCurrency] = useState("usd");
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 6,
      });
      const percentFormatter = new Intl.NumberFormat(undefined, {
        maximumFractionDigits: 2,
        style: "percent",
      });

      const allCoin = await coinGecko.get("/global");
      const pages = Math.ceil(allCoin.data.data.active_cryptocurrencies / 250);

      const reqs = [];

      for (let i = 1; i <= pages; i++) {
        reqs.push(
          coinGecko.get("/coins/markets", {
            params: {
              vs_currency: currency,
              order: "market_cap_desc",
              per_page: 250,
              page: i,
              price_change_percentage: "24h",
            },
          })
        );
      }

      const res = await Promise.all(reqs);

      const markets = res.reduce(
        (prev, current) => prev.concat(current.data),
        []
      );
      setList(
        markets.map((item) => {
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
  }, [currency]);

  const search = (prefix) => {
    return list.filter((value) => {
      return (
        value.name.toLowerCase().startsWith(prefix.toLowerCase()) ||
        value.id.toLowerCase().startsWith(prefix.toLowerCase())
      );
    });
  };

  return (
    <CoinListContext.Provider
      value={{
        currency,
        isLoading,
        list,
        page,
        perPage,
        setCurrency,
        setPage,
        setPerPage,
        search,
      }}
    >
      {children}
    </CoinListContext.Provider>
  );
};

export default CoinListProvider;
