import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
// reducers actions:
import { userSignedIn, userLoggedOut } from "./features/user/userSlice";
import { resetState } from "./features/notes/notesSlice";
// thunks:
import { fetchNotes } from "./thunks/notes/fetchNotes";
import { fetchTags } from "./thunks/tags/fetchTags";
import { fetchAuthors } from "./thunks/authors/fetchAuthors";
import { fetchSources } from "./thunks/sources/fetchSources";
//================================================
import { Routes, Route } from "react-router-dom";
// custom components:
import RequireAuth from "./components/RequireAuth";
// layout:
import Layout from "./layout/Layout";
// pages:
import About from "./pages/About.js";
import SignIn from "./pages/SignIn.js";
import SignUp from "./pages/SignUp.js";
import Notes from "./pages/Notes.js";
import Note from "./pages/Note.js";
import AddNote from "./pages/AddNote.js";
import UpdateNote from "./pages/UpdateNote.js";
import Tags from "./pages/Tags.js";
import AddAuthor from "./pages/AddAuthor";
import Authors from "./pages/Authors";
import UpdateAuthor from "./pages/UpdateAuthor";
import AddSource from "./pages/AddSource";
import Sources from "./pages/Sources";
import UpdateSource from "./pages/UpdateSource";

const ROUTES = {
	public: [
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
	],
	private: [
		{
			path: "/",
			element: <Notes />,
		},
		{
			path: "/notes/:itemKey",
			element: <Note />,
		},
		{
			path: "/tags",
			element: <Tags />,
		},
		{
			path: "/add-note",
			element: <AddNote />,
		},
		{
			path: "/notes/update-note/:itemKey",
			element: <UpdateNote />,
		},
		{
			path: "/authors",
			element: <Authors />,
		},
		{
			path: "/add-author",
			element: <AddAuthor />,
		},
		{
			path: "/authors/update-author/:itemKey",
			element: <UpdateAuthor />,
		},
		{
			path: "/sources",
			element: <Sources />,
		},
		{
			path: "/add-source",
			element: <AddSource />,
		},
		{
			path: "/sources/update-source/:itemKey",
			element: <UpdateSource />,
		},
	],
};

export default function App() {
	const user = useSelector((state) => state.user.value);
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
					//========> UNCOMMENT THIS CODE TO FETCH DATA AFTER APP MOUNTS & USER IS LOGGED:
					dispatch(fetchNotes({ reference: "items/" + uid })); // TODO: change "items" into "notes" (in rtdb too)
					dispatch(fetchTags({ reference: "tags/" + uid }));
					dispatch(fetchAuthors({ reference: "authors/" + uid }));
					dispatch(fetchSources({ reference: "sources/" + uid }));
				} else {
					// User is signed out
					dispatch(userLoggedOut());
					dispatch(resetState()); // TODO: resetNotes, resetAuthors etc.
				}
			});
		return unsubscribe();
	}, [dispatch]);

	return (
		<div className="App">
			<Layout>
				<Routes>
					{ROUTES.public.map((route) => (
						<Route path={route.path} element={route.element} key={route.path} />
					))}
					{ROUTES.private.map((route) => (
						<Route
							path={route.path}
							element={<RequireAuth>{route.element}</RequireAuth>}
							key={route.path}
						/>
					))}
				</Routes>
			</Layout>
		</div>
	);
}
