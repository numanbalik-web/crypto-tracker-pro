import { useEffect, useState } from "react";
import api from "../utils/api";

const useCoinDetail = (coinId) => {
  // coin detay state'leri
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [coin, setCoin] = useState(null);
  const [error, setError] = useState(null);

  // fiyat geçmişi state'leri
  const [selectedPeriod, setSelectedPeriod] = useState(7);
  const [priceHistory, setPriceHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  // coin detaylarını çeken fonksiyon
  const getCoinDetails = (isRefreshing) => {
    isRefreshing ? setRefreshing(true) : setIsLoading(true);

    api
      .get(`/coins/${coinId}`)
      .then((res) => {
        setCoin(res.data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        setIsLoading(false);
        setRefreshing(false);
      });
  };

  // fiyat geçmişini çeken fonksiyon
  const getPriceHistory = async () => {
    setHistoryLoading(true);

    const params = { vs_currency: "usd", days: String(selectedPeriod) };

    api
      .get(`/coins/${coinId}/market_chart`, { params })
      .then((res) => {
        setPriceHistory(res.data.prices);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setHistoryLoading(false));
  };

  // ekrandaki verileri yenileme fonksiyon
  const refreshData = () => {
    getCoinDetails(true);
    getPriceHistory();
  };

  // sayfa yüklenme anında verileri al
  useEffect(() => {
    getCoinDetails();
    getPriceHistory();
  }, []);

  // gün değeri değişince yeni fyat geçmişini al
  useEffect(() => {
    if (coin) {
      refreshData();
    }
  }, [selectedPeriod]);

  // hook'un return ettiği verileri belirle
  return {
    coin,
    isLoading,
    refreshing,
    error,
    selectedPeriod,
    priceHistory,
    historyLoading,
    setSelectedPeriod,
    refetch: () => getCoinDetails(false),
    refreshData,
  };
};

export default useCoinDetail;
