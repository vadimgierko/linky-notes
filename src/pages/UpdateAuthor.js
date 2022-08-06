import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/useTheme";
// custom components:
import AuthorForm from "../components/AuthorForm";
// thunks:
import { updateAuthor } from "../thunks/authors/updateAuthor";

export default function UpdateAuthor() {
	const { theme } = useTheme();
	const { itemKey } = useParams();
	const user = useSelector((state) => state.user.value);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function handleSubmit(e, author) {
		e.preventDefault();
		console.log("Author to update:", author);
		dispatch(updateAuthor({ author: author, key: itemKey })).then(() =>
			navigate("/authors")
		);
	}

	if (!user.id)
		return (
			<div
				className="update-author-page"
				style={{
					backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
					color: theme === "light" ? "black" : "white",
				}}
			>
				<p>You need to log in to update an author...</p>
			</div>
		);

	return (
		<div
			className="update-author-page"
			style={{
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				color: theme === "light" ? "black" : "white",
			}}
		>
			<AuthorForm authorKey={itemKey} onSubmit={handleSubmit} />
		</div>
	);
}
