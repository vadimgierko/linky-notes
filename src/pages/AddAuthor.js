import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
// contexts:
import { useTheme } from "../contexts/useTheme";
// custom components:
import AuthorForm from "../components/AuthorForm";
// thunks:
import { addAuthor } from "../thunks/authors/addAuthor";
// helper functions:
import generateFirebaseKeyFor from "../firebase-rtdb-crud/generateFirebaseKeyFor";

export default function AddAuthor() {
	const { theme } = useTheme();
	const user = useSelector((state) => state.user.value);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// this is needed, when adding new author redirected from SourceForm:
	// here is state.redirectedFrom prop to redirect back when author added
	// & state.passedSourceObject to pass back to the SourceForm:
	const { state } = useLocation(); // state: {redirectedFrom: "", passedSourceObject: {}}

	function handleSubmit(e, author) {
		e.preventDefault();
		console.log("Author to add:", author);
		const newKey = generateFirebaseKeyFor("authors/" + user.id);
		// set different navigation depend on if was redirected from SourceForm:
		if (state && state.redirectedFrom && state.passedSourceObject) {
			// if was redirected from SourceForm = if there is state passed:
			dispatch(addAuthor({ author: author, key: newKey })).then(() =>
				// navigate back to SourceForm &
				// pass new author key & pass back passedSourceObject
				// to complete the previously completed form:
				navigate(state.redirectedFrom, {
					state: {
						newAuthorKey: newKey,
						passedSourceObject: state.passedSourceObject,
					},
				})
			);
		} else {
			// if the author was added after "add author" button click
			// redirect to /authors:
			dispatch(addAuthor({ author: author, key: newKey })).then(() =>
				navigate("/authors")
			);
		}
	}

	useEffect(() => {
		console.log(
			"AddAuthor state from useLocation (state passed from SourceForm):",
			state
		);
	}, [state]);

	if (!user.id)
		return (
			<div
				className="add-author-page"
				style={{
					backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
					color: theme === "light" ? "black" : "white",
				}}
			>
				<p>You need to log in to add an author...</p>
			</div>
		);

	return (
		<div
			className="add-author-page"
			style={{
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				color: theme === "light" ? "black" : "white",
			}}
		>
			<AuthorForm onSubmit={handleSubmit} />
		</div>
	);
}
