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
import { Routes, Route } from "react-router-dom";
import { useStore } from "./store/Store";
// layout:
import Layout from "./layout/Layout";
// pages:
import About from "./components/pages/About";
import SignIn from "./components/pages/SignIn";
import Items from "./components/pages/Items";
import AddItem from "./components/pages/AddItem";
import UpdateItem from "./components/pages/UpdateItem";
import Item from "./components/pages/Item";
import Tags from "./components/pages/Tags";
import SignUp from "./components/pages/SignUp";

const ROUTES = [
	{
		path: "/about",
		element: <About />,
	},
	{
		path: "/signin",
		element: <SignIn />,
	},
	{
		path: "/signup",
		element: <SignUp />,
	},
	{
		path: "/notes/:itemKey",
		element: <Item />,
	},
	{
		path: "/tags",
		element: <Tags />,
	},
	{
		path: "/add-note",
		element: <AddItem />,
	},
	{
		path: "/notes/update-note/:itemKey",
		element: <UpdateItem />,
	},
	{
		path: "/",
		element: <Items />,
	},
];

export default function App() {
	const { state } = useStore(); // the old context api based store => be replaced with redux

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
					//dispatch(fetchNotes({ reference: "items/" + uid })); // TODO: change "items" into "notes" (in rtdb too)
				} else {
					// User is signed out
					dispatch(userLoggedOut());
					dispatch(resetState());
				}
			});
		return unsubscribe();
	}, [dispatch]);

	return (
		<div className="App">
			<Layout>
				<Routes>
					{ROUTES.map((route) => (
						<Route path={route.path} element={route.element} key={route.path} />
					))}
				</Routes>
			</Layout>
		</div>
	);
}
