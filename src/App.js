import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
// reducers actions:
import { userSignedIn, userLoggedOut } from "./features/user/userSlice";
import { resetNotes } from "./features/notes/notesSlice";
import { resetAuthors } from "./features/authors/authorsSlice";
import { resetSources } from "./features/sources/sourcesSlice";
import { resetTags } from "./features/tags/tagsSlice";
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
// contexts:
import { useTheme } from "./contexts/useTheme";
// pages:
import About from "./pages/About"; // index.js from "About" folder
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
	const { theme, setTheme } = useTheme();
	const [isDarkModePrefered, setIsDarkModePrefered] = useState();
	const user = useSelector((state) => state.user.value);
	// const NOTES = useSelector((state) => state.notes.value);
	// const SOURCES = useSelector((state) => state.sources.value);
	// const AUTHORS = useSelector((state) => state.authors.value);
	// const TAGS = useSelector((state) => state.tags.value);

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
					dispatch(resetNotes());
					dispatch(resetAuthors());
					dispatch(resetSources());
					dispatch(resetTags());
				}
			});
		return unsubscribe();
	}, [dispatch]);

	// DARK MODE:
	useEffect(() => {
		const userPrefersDarkMode = () =>
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches;
		console.log("Does user prefer dark mode?", userPrefersDarkMode());
		setIsDarkModePrefered(userPrefersDarkMode());
	}, []);

	useEffect(() => {
		if (isDarkModePrefered) {
			setTheme("dark");
			console.log("App: switched to the dark mode.");
		}
	}, [isDarkModePrefered]);

	// useEffect(() => {
	// 	const APP_STATE = {
	// 		notes: NOTES,
	// 		sources: SOURCES,
	// 		authors: AUTHORS,
	// 		tags: TAGS,
	// 	};
	// 	console.log("APP_STATE:", APP_STATE);
	// }, [NOTES, SOURCES, AUTHORS, TAGS]);

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
							element={user.id ? route.element : <RequireAuth />}
							key={route.path}
						/>
					))}
				</Routes>
			</Layout>
		</div>
	);
}
