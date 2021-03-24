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
  const [currency, setCurrency] = useState(
    window.localStorage.getItem("currency") || "usd"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [activeCryptos, setActiveCryptos] = useState(0);
  const [allCoins, setAllCoins] = useState([]);

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

      if (activeCryptos === 0) {
        const allCoin = await coinGecko.get("/coins/list", {
          params: {
            include_platform: false,
          },
        });
        const actives = allCoin.data.length;
        setActiveCryptos(actives);
        setAllCoins(allCoin.data);
      }

      const currentPage = await coinGecko.get("/coins/markets", {
        params: {
          vs_currency: currency,
          order: "market_cap_desc",
          per_page: perPage,
          page: page + 1,
          price_change_percentage: "24h",
        },
      });

      const markets = currentPage.data;

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
  }, [currency, page, perPage, activeCryptos]);

  const search = (prefix) => {
    return allCoins.filter((value) => {
      return (
        value.name.toLowerCase().startsWith(prefix.toLowerCase()) ||
        value.id.toLowerCase().startsWith(prefix.toLowerCase())
      );
    });
  };

  const currencySetter = (value) => {
    window.localStorage.setItem("currency", value);
    setCurrency(value);
  };

  return (
    <CoinListContext.Provider
      value={{
        currency,
        isLoading,
        list,
        page,
        perPage,
        activeCryptos,
        setCurrency: currencySetter,
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
