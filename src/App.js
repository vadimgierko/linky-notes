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
//================================================
import { Routes, Route } from "react-router-dom";
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
import { fetchAuthors } from "./thunks/authors/fetchAuthors";
import UpdateAuthor from "./pages/UpdateAuthor";

export default function App() {
	const user = useSelector((state) => state.user.value);
	const dispatch = useDispatch();

	const ROUTES = [
		{
			path: "/",
			element: user.id ? <Notes /> : <About />,
		},
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
	];

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
					dispatch(fetchAuthors({ reference: "authors/" + uid }));
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
