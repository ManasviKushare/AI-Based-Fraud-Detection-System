import { createContext, useContext, useEffect, useState } from "react";
import { lightTheme, darkTheme } from "../theme";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  useEffect(() => {

    localStorage.setItem("darkMode", darkMode);

    if (darkMode) {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }

}, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

 return (
  <ThemeContext.Provider
    value={{
      darkMode,
      toggleTheme,
      theme: darkMode ? darkTheme : lightTheme,
    }}
  >
    {children}
  </ThemeContext.Provider>
);
}

export const useTheme = () => useContext(ThemeContext);