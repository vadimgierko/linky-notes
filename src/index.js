import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import App from "./App";
import { ThemeProvider } from "./contexts/useTheme";
import store from "./store/store";
import { Provider } from "react-redux";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const rootElement = document.getElementById("root");

// NOTE:
// <StrictMode> is off (deleted) to prevent the double fetching data from database in dev mode.
// Uncomment this code when build.

ReactDOM.render(
	<ThemeProvider>
		<HashRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</HashRouter>
	</ThemeProvider>,
	rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
