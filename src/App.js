import { Switch, Route } from "react-router-dom";
import { useTheme } from "./hooks/use-theme";
import { useStore } from "./store/Store";
import Header from "./components/organisms/Header";
import About from "./components/pages/About";
import SignIn from "./components/pages/SignIn";
import Items from "./components/pages/Items";
import Footer from "./components/organisms/Footer";
import AddItem from "./components/pages/AddItem";
import UpdateItem from "./components/pages/UpdateItem";
import Item from "./components/pages/Item";
import Tags from "./components/pages/Tags";
import AddSource from "./components/pages/AddSource";
import { useEffect } from "react";

export default function App() {
	const { theme } = useTheme();
	const { state } = useStore();

	useEffect(() => {
		console.log("app store:", state);
	}, [state]);

	return (
		<div
			className="container-fluid"
			style={{
				background: theme.background,
				color: theme.color,
				minHeight: "100vh",
			}}
		>
			<Header />
			<div
				className="container"
				style={{
					background: theme.background,
					color: theme.color,
					paddingTop: 70,
				}}
			>
				<Switch>
					<Route path="/about">
						<About />
					</Route>
					<Route path="/signin">
						<SignIn />
					</Route>
					<Route exact path="/notes/:itemKey">
						<Item />
					</Route>
					<Route path="/tags">
						<Tags />
					</Route>
					<Route path="/add-note">
						<AddItem />
					</Route>
					<Route exact path="/notes/update-note/:itemKey">
						<UpdateItem />
					</Route>
					<Route exact path="/add-source">
						<AddSource />
					</Route>
					{/* <Route path="/">
            <Items />
          </Route> */}
				</Switch>
				<Footer />
			</div>
		</div>
	);
}
