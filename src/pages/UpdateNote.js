import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/useTheme";
// custom components:
import NoteForm from "../components/NoteForm";
// thunks:
import { updateNote } from "../thunks/notes/updateNote";

export default function UpdateNote() {
	const { theme } = useTheme();
	const { itemKey } = useParams();
	const user = useSelector((state) => state.user.value);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function handleSubmit(e, note) {
		e.preventDefault();
		console.log("Note to update:", note);
		dispatch(updateNote({ note: note, key: itemKey })).then(() =>
			navigate("/notes/" + itemKey)
		);
	}

	if (!user.id)
		return (
			<div
				className="update-note-page"
				style={{
					backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
					color: theme === "light" ? "black" : "white",
				}}
			>
				<p>You need to log in to update an item...</p>
			</div>
		);

	return (
		<div
			className="update-note-page"
			style={{
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				color: theme === "light" ? "black" : "white",
			}}
		>
			<NoteForm noteKey={itemKey} onSubmit={handleSubmit} />
		</div>
	);
}
