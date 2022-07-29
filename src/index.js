import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import App from "./App";
import { ThemeProvider } from "./hooks/use-theme.js";
import { StoreProvider } from "./store/Store";
// redux:
// TODO: when old Context Store will be replaced, rename "redux-store" folder into "store":
import store from "./redux-store/store";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");

// NOTE:
// <StrictMode> is off (deleted) to prevent the double fetching data from database in dev mode.
// Uncomment this code when build.

ReactDOM.render(
	<ThemeProvider>
		<HashRouter>
			<StoreProvider>
				<Provider store={store}>
					<App />
				</Provider>
			</StoreProvider>
		</HashRouter>
	</ThemeProvider>,
	rootElement
);
