import { RefreshCw } from "lucide-react";

const RefreshButton = ({ refreshing, fetchCoins, setSearchTerm }) => {
  const handleRefresh = () => {
    setSearchTerm("");
    fetchCoins(true);
  };

  return (
    <button
      aria-label="Güncel verileri çek"
      disabled={refreshing}
      onClick={handleRefresh}
      className="p-3 bg-blue-600 rounded-lg text-white"
    >
      <RefreshCw />
    </button>
  );
};

export default RefreshButton;
