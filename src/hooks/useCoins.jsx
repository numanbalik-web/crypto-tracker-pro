import { useEffect, useMemo, useState } from "react";
import api from "../utils/api";

const useCoins = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coins, setCoins] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCoins = (isRefreshing) => {
    isRefreshing ? setRefreshing(true) : setIsLoading(true);

    api
      .get("/coins/markets?vs_currency=usd&per_page=100&order=market_cap_desc")
      .then((res) => {
        setError(null);
        setCoins(res.data);
        setLastUpdated(new Date());
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        setIsLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    const id = setInterval(() => fetchCoins(true), 30000);
    return () => clearInterval(id);
  }, []);

  const filteredCoins = useMemo(
    () =>
      coins.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [coins, searchTerm],
  );

  return {
    isLoading,
    error,
    coins,
    filteredCoins,
    lastUpdated,
    refreshing,
    fetchCoins,
    searchTerm,
    setSearchTerm,
  };
};

export default useCoins;
