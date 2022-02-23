import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import App from "./App";
import { ThemeProvider } from "./hooks/use-theme.js";
import { StoreProvider } from "./store/Store";

const rootElement = document.getElementById("root");

ReactDOM.render(
	<StrictMode>
		<HashRouter>
			<ThemeProvider>
				<StoreProvider>
					<App />
				</StoreProvider>
			</ThemeProvider>
		</HashRouter>
	</StrictMode>,
	rootElement
);
