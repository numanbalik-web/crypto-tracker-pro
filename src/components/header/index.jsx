import { Moon, Star, Sun, TrendingUp } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/theme-context";

const Header = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <TrendingUp className="text-gray-100" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Udemig Tracker
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                kripto para takip sistemi
              </p>
            </div>
          </Link>

          {/* Iconlar */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
              <Star className="size-5" />
              <span className="text-sm">3</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg dark:bg-gray-700 dark:text-gray-300"
            >
              {isDarkTheme ? (
                <Moon className="size-5 text-gray-400" />
              ) : (
                <Sun className="size-5 text-gray-400" />
              )}
            </button>

            <button className="flex items-center gap-2 text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
              <span className="text-sm dark:text-gray-500">Canlı</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
