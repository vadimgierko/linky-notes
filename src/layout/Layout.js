import { useTheme } from "../contexts/useTheme";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import { Container } from "react-bootstrap";

export default function Layout({ children }) {
	const { theme } = useTheme();

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				minHeight: "100vh",
			}}
		>
			<Navbar />
			<Container as="main" style={{ paddingTop: 70, flexGrow: 1 }}>
				{children}
			</Container>
			<Footer />
		</div>
	);
}
