import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
// custom components:
import NoteForm from "../components/NoteForm";
// thunks:
import { updateNote } from "../thunks/notes/updateNote";

export default function UpdateNote() {
	const { itemKey } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function handleSubmit(e, note) {
		e.preventDefault();
		console.log("Note to update:", note);
		dispatch(updateNote({ note: note, key: itemKey })).then(() =>
			navigate("/notes/" + itemKey)
		);
	}

	return <NoteForm noteKey={itemKey} onSubmit={handleSubmit} />;
}
