import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState("light"); // default: light

	const switchTheme = () => {
		if (theme === "dark") {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	};

	const value = { theme, setTheme, switchTheme };

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};
