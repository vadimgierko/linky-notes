import { useTheme } from "../contexts/useTheme";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import { Container } from "react-bootstrap";

export default function Layout({ children }) {
	const { theme } = useTheme();
	const maxWidth = 900;

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				minHeight: "100vh",
			}}
		>
			<Navbar maxWidth={maxWidth} />
			<Container
				as="main"
				style={{
					paddingTop: 70,
					flexGrow: 1,
					maxWidth: maxWidth,
					backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
					color: theme === "light" ? "black" : "white",
				}}
			>
				{children}
			</Container>
			<Footer maxWidth={maxWidth} />
		</div>
	);
}
