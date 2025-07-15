"use client";
import useTheme from "@/context/useTheme";
import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import Footer from "./Footer";
import ScrollToTop from "../ScrollToTop";
import NavBar from "./Navbar";

export default function Layout({ children }: { children: ReactNode }) {
	const { theme } = useTheme();
	const maxWidth = 900;

	// 	useEffect(() => {
	// 		const WARNING_MESSAGE = `
	// WARNING [June 26, 2025]!

	// Due to a critical bug,
	// that causes that tags sometimes have more notes assigned, that it should be,
	// all WRITE OPERATIONS (update, delete) ARE OFF
	// UNTIL THE BUG IS FIXED.

	// However, you can still read & browse your notes & tags!`;

	// 		alert(WARNING_MESSAGE.toUpperCase());
	// 	}, []);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				minHeight: "100vh",
			}}
		>
			<NavBar maxWidth={maxWidth} />
			<Container
				as="main"
				style={{
					paddingTop: 70,
					flexGrow: 1,
					maxWidth: maxWidth,
				}}
			>
				{children}
			</Container>
			<ScrollToTop />
			<Footer maxWidth={maxWidth} />
		</div>
	);
}
