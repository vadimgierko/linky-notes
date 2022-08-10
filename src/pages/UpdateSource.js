import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
// custom components:
import SourceForm from "../components/SourceForm";
// thunks:
import { updateSource } from "../thunks/sources/updateSource";

export default function UpdateSource() {
	const { itemKey } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function handleSubmit(e, source) {
		e.preventDefault();
		console.log("Source to update:", source);
		dispatch(updateSource({ source: source, key: itemKey })).then(() =>
			navigate("/sources")
		);
	}

	return <SourceForm sourceKey={itemKey} onSubmit={handleSubmit} />;
}
