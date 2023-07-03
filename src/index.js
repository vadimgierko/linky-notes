import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import App from "./App";
import { ThemeProvider } from "./contexts/useTheme";
import store from "./store";
import { Provider } from "react-redux";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const container = document.getElementById("root");
const root = createRoot(container);

// NOTE:
// <StrictMode> is off (deleted) to prevent the double fetching data from database in dev mode.
// Uncomment this code when build.

root.render(
	<ThemeProvider>
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</ThemeProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
