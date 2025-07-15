"use client";

import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
	theme: Theme;
	switchTheme: () => void;
} | null>(null);

export default function useTheme() {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error("useTheme has to be used within <ThemeContext.Provider>");
	}

	return context;
}

type ThemeProviderProps = {
	children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>("dark");

	const switchTheme = () => {
		const newTheme: Theme = theme === "dark" ? "light" : "dark";
		setTheme(newTheme);
		localStorage.setItem("linky-notes-app-theme", newTheme);
		document.documentElement.setAttribute("data-bs-theme", newTheme);
	};

	useEffect(() => {
		const savedTheme = localStorage.getItem("linky-notes-app-theme");

		if (savedTheme) {
			setTheme(savedTheme as Theme);
			document.documentElement.setAttribute("data-bs-theme", savedTheme);
		} else {
			localStorage.setItem("linky-notes-app-theme", "dark");
			document.documentElement.setAttribute("data-bs-theme", "dark");
		}
	}, []);

	const value = {
		theme,
		switchTheme,
	};

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}
