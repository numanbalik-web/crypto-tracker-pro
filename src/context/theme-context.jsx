import { createContext, useContext, useEffect, useState } from "react";

// Context Kurulumu
export const ThemeContext = createContext();

// Context Sağlayıcısı (HOC)
export const ThemeProvider = ({ children }) => {
  // tema state'i
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    // localStorage'a kaydedilmiş bir tema varsa onu kullan
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }

    // projeye ilk defa giren biri için tarayıcıda tercih edilen temayı kullan
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // temayı değiştirme fonksiyonu
  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  // tema değişiminin tailwindin algılaması için html elementine dark class'ı ekle
  useEffect(() => {
    const root = document.documentElement;

    if (isDarkTheme) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkTheme]);

  // context yapısından diğer bileşenlere sağlanacak verileri belirle
  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Context'e abone olmak için hook
export const useTheme = () => useContext(ThemeContext);
