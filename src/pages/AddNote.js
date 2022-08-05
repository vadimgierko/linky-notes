import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/useTheme";
// custom components:
import NoteForm from "../components/NoteForm";
// thunks:
import { addNote } from "../thunks/notes/addNote";
// helper functions:
import generateFirebaseKeyFor from "../firebase-rtdb-crud/generateFirebaseKeyFor";

export default function AddNote() {
	const { theme } = useTheme();
	const user = useSelector((state) => state.user.value);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function handleSubmit(e, note) {
		e.preventDefault();
		console.log("Note to add:", note);
		const newKey = generateFirebaseKeyFor("items/" + user.id);
		dispatch(addNote({ note: note, key: newKey })).then(() =>
			navigate("/notes/" + newKey)
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
				<p>You need to log in to add an item...</p>
			</div>
		);

	return (
		<div
			className="add-note-page"
			style={{
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				color: theme === "light" ? "black" : "white",
			}}
		>
			<NoteForm onSubmit={handleSubmit} />
		</div>
	);
}
