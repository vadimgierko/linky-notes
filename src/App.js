import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
// reducers actions:
import { userSignedIn, userLoggedOut } from "./features/user/userSlice";
import { resetState } from "./features/notes/notesSlice";
// thunks:
import { fetchNotes } from "./thunks/notes/fetchNotes";
import { fetchTags } from "./thunks/tags/fetchTags";
//================================================
import { Routes, Route } from "react-router-dom";
import { useStore } from "./store/Store";
// layout:
import Layout from "./layout/Layout";
// pages:
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Notes from "./pages/Notes";
import Note from "./pages/Note";
import AddNote from "./pages/AddNote";
import UpdateNote from "./pages/UpdateNote";
import Tags from "./pages/Tags";

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
		path: "/",
		element: <Notes />,
	},
	// {
	// 	path: "/notes/:itemKey",
	// 	element: <Note />,
	// },
	// {
	// 	path: "/tags",
	// 	element: <Tags />,
	// },
	// {
	// 	path: "/add-note",
	// 	element: <AddNote />,
	// },
	// {
	// 	path: "/notes/update-note/:itemKey",
	// 	element: <UpdateNote />,
	// },
];

export default function App() {
	const dispatch = useDispatch();

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
					dispatch(fetchTags({ reference: "tags/" + uid }));
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
