import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// custom components:
import PrivatePageContainer from "../components/PrivatePageContainer";
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
		console.log("Note to add:", note);
		const newKey = generateFirebaseKeyFor("items/" + user.id);
		dispatch(addNote({ note: note, key: newKey })).then(() =>
			navigate("/notes/" + newKey)
		);
	}

	return (
		<PrivatePageContainer
			pageNameWithoutWordPage="add-note"
			youNeedToLogInTo="add a new note"
		>
			<NoteForm onSubmit={handleSubmit} />
		</PrivatePageContainer>
	);
}
