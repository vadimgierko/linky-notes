import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
// reducers actions:
import { userSignedIn, userLoggedOut } from "./features/user/userSlice";
import { resetState } from "./features/notes/notesSlice";
// thunks:
import { fetchNotes } from "./thunks/notes/fetchNotes";
//================================================
import { Switch, Route } from "react-router-dom";
import { useTheme } from "./hooks/use-theme";
import { useStore } from "./store/Store";
// components & pages:
import Header from "./components/organisms/Header";
import About from "./components/pages/About";
import SignIn from "./components/pages/SignIn";
import Items from "./components/pages/Items";
import Footer from "./components/organisms/Footer";
import AddItem from "./components/pages/AddItem";
import UpdateItem from "./components/pages/UpdateItem";
import Item from "./components/pages/Item";
import Tags from "./components/pages/Tags";
import SignUp from "./components/pages/SignUp";

export default function App() {
	const { theme } = useTheme();
	const { state } = useStore();

	const dispatch = useDispatch();

	useEffect(() => {
		console.log("app store (Context API):", state);
	}, [state]);

	// listen to the user logs in & out:
	useEffect(() => {
		const unsubscribe = () =>
			onAuthStateChanged(auth, (user) => {
				if (user) {
					// user is logged in
					const uid = user.uid;
					const email = user.email;
					dispatch(userSignedIn({ email: email, id: uid }));
					//========> UNCOMMENT THIS CODE TO FETCH AFTER APP MOUNTS & USER IS LOGGED:
					dispatch(fetchNotes({ reference: "items/" + uid })); // TODO: change "items" into "notes" (in rtdb too)
				} else {
					// User is signed out
					dispatch(userLoggedOut());
					dispatch(resetState());
				}
			});
		return unsubscribe();
	}, [dispatch]);

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
					<Route path="/signup">
						<SignUp />
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
					<Route path="/">
						<Items />
					</Route>
				</Switch>
				<Footer />
			</div>
		</div>
	);
}
