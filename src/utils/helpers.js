// fiyatı formatla
export const formatPrice = (price) => {
  if (!price) return "N/A";

  const absPrice = Math.abs(price);

  if (absPrice < 0.01) return `$${price.toFixed(6)}`;
  if (absPrice < 1) return `$${price.toFixed(4)}`;
  if (absPrice < 100) return `$${price.toFixed(2)}`;

  return `$${price.toLocaleString()}`;
};

// yüzdelik değeri formatla
export const formatPercantage = (value) => {
  if (value === null) return "N/A";

  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  const formatted = Math.abs(value).toFixed(2);

  return `${sign}${formatted}%`;
};

// büyük sayıları formatla
const NUMBER_UNITS = [
  { value: 1e12, symbol: "T" },
  { value: 1e9, symbol: "Mr" },
  { value: 1e6, symbol: "Mn" },
];

export const formatBigNumber = (value) => {
  if (value === null) return "N/A";

  for (const unit of NUMBER_UNITS) {
    if (value >= unit.value) {
      return `$${(value / unit.value).toFixed(2)}${unit.symbol}`;
    }
  }

  return `$${value.toLocaleString()}`;
};

// tarihi formatla
export const formatDate = (timestamp, days) => {
  const date = new Date(timestamp);

  if (days === 1) {
    // 1 gün seçilyse saat ve dakikayı döndür
    return date.toLocaleTimeString("tr", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (days === 7) {
    // 7 gün seçilyse gün/ay/gün ismi döndür
    return date.toLocaleDateString("tr", {
      day: "2-digit",
      month: "2-digit",
      weekday: "short",
    });
  } else {
    // 7 günden büyük bir değer seçiliyse gün / ay döndür
    return date.toLocaleDateString("tr", {
      day: "2-digit",
      month: "2-digit",
    });
  }
};
