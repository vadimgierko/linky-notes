import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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

	function handleSubmit(e, author) {
		e.preventDefault();
		console.log("Author to add:", author);
		const newKey = generateFirebaseKeyFor("authors/" + user.id);
		dispatch(addAuthor({ author: author, key: newKey })).then(() =>
			navigate("/authors")
		);
	}

	if (!user.id)
		return (
			<div
				className="add-note-page"
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
