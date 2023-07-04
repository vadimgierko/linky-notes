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

		if (!note.content.length)
			return alert(
				"Your note is empty! Add some content to your note to update it in database."
			);

		if (!Object.keys(note.existingTags).length && !note.newTags.length)
			return alert(
				"Your note has no tags! Add at least 1 tag to update it in database."
			);

		dispatch(updateNote({ note: note, key: itemKey })).then(() => {
			navigate("/notes/" + itemKey, { replace: true });
			window.scrollTo({ top: 0 });
		});
	}

	function handleCancel() {
		navigate("/notes/" + itemKey, { replace: true });
		window.scrollTo({ top: 0 });
	}

	return (
		<NoteForm
			noteKey={itemKey}
			onSubmit={handleSubmit}
			onCancel={handleCancel}
		/>
	);
}
