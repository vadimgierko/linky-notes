import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// thunks:
import { addSource } from "../thunks/sources/addSource";
// helper functions:
import generateFirebaseKeyFor from "../firebase-rtdb-crud/generateFirebaseKeyFor";
// custom components:
import PrivatePageContainer from "../components/PrivatePageContainer";
import SourceForm from "../components/SourceForm";

export default function AddSource() {
	const user = useSelector((state) => state.user.value);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function handleSubmit(e, source) {
		e.preventDefault();
		console.log("Source to add:", source);
		const newKey = generateFirebaseKeyFor("sources/" + user.id);
		dispatch(addSource({ source: source, key: newKey })).then(() =>
			navigate("/sources")
		);
	}

	return (
		<PrivatePageContainer
			pageNameWithoutWordPage="add-source"
			youNeedToLogInTo="add a new source"
		>
			<SourceForm onSubmit={handleSubmit} />
		</PrivatePageContainer>
	);
}
