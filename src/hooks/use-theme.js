import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState({
    mode: "dark",
      color: "white",
      background: "rgb(41, 41, 41)"
  });

  const switchToLight = () =>
    setTheme({
      mode: "light",
      color: "black",
      background: "white"
    });

  const switchToDark = () =>
    setTheme({
      mode: "dark",
      color: "white",
      background: "rgb(39, 37, 37)"
    });

  return (
    <ThemeContext.Provider
      value={{
        theme,
        switchToLight,
        switchToDark
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
