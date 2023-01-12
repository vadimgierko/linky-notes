import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// custom components:
import NoteForm from "../components/NoteForm";
// thunks:
import { addNote } from "../thunks/notes/addNote";
// helper functions:
import generateFirebaseKeyFor from "../firebase-rtdb-crud/generateFirebaseKeyFor";

export default function AddNote() {
	const user = useSelector((state) => state.user.value);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function handleSubmit(e, note) {
		e.preventDefault();
		//console.log("Note to add:", note);
		if (note.content.length) {
			const newKey = generateFirebaseKeyFor("items/" + user.id);
			dispatch(addNote({ note: note, key: newKey })).then(() => {
				navigate("/notes/" + newKey, { replace: true });
			});
		} else {
			alert(
				"Your note is empty! Add some content to your note to add it to database."
			);
		}
	}

	function handleCancel() {
		navigate("/", { replace: true });
	}

	return <NoteForm onSubmit={handleSubmit} onCancel={handleCancel} />;
}
