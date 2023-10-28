import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
// reducers actions:
import { userSignedIn, userLoggedOut } from "./features/user/userSlice";
import { resetNotes } from "./features/notes/notesSlice";
import { resetTags } from "./features/tags/tagsSlice";
// thunks:
import { fetchNotes } from "./thunks/notes/fetchNotes";
import { fetchTags } from "./thunks/tags/fetchTags";
//================================================
import { Routes, Route } from "react-router-dom";
// custom components:
import RequireAuth from "./components/RequireAuth";
// layout:
import Layout from "./layout/Layout";
// contexts:
import { useTheme } from "./contexts/useTheme";
// pages:
import About from "./pages/About";
import SignIn from "./pages/SignIn.js";
import SignUp from "./pages/SignUp.js";
import Notes from "./pages/Notes.js";
import Note from "./pages/Note.js";
import AddNote from "./pages/AddNote.js";
import UpdateNote from "./pages/UpdateNote.js";
import Tags from "./pages/Tags.js";
import MarkdownGuide from "./pages/MarkdownGuide";
import AppGuide from "./pages/AppGuide";
import PasswordReset from "./pages/PasswordReset";

const ROUTES = {
	public: [
		{
			path: "/about",
			element: <About />,
		},
		{
			path: "/markdown-guide",
			element: <MarkdownGuide />,
		},
		{
			path: "/app-guide",
			element: <AppGuide />,
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
			path: "/password-reset",
			element: <PasswordReset />,
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
	],
};

export default function App() {
	const { theme, setTheme } = useTheme();
	const [isDarkModePrefered, setIsDarkModePrefered] = useState();
	const user = useSelector((state) => state.user.value);
	//========= UNCOMMENT THE CODE BELOW TO CHECK THE DATA IN CONSOLE:
	const NOTES = useSelector((state) => state.notes.value);
	const TAGS = useSelector((state) => state.tags.value);
	//===============================================================//

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
					dispatch(fetchNotes({ reference: "items/" + uid }));
					dispatch(fetchTags({ reference: "tags/" + uid }));
				} else {
					// User is signed out
					dispatch(userLoggedOut());
					dispatch(resetNotes());
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

	useEffect(() => {
		const APP_STATE = {
			notes: NOTES,
			tags: TAGS,
		};
		console.log("APP_STATE:", APP_STATE);
	}, [NOTES, TAGS]);

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
