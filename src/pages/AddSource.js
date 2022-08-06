import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/useTheme";
// thunks:
import { addSource } from "../thunks/sources/addSource";
// helper functions:
import generateFirebaseKeyFor from "../firebase-rtdb-crud/generateFirebaseKeyFor";
// custom components:
import SourceForm from "../components/SourceForm";

export default function AddSource() {
	const { theme } = useTheme();
	const user = useSelector((state) => state.user.value);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function handleSubmit(e, source) {
		e.preventDefault();
		console.log("Source to add:", source);
		const newKey = generateFirebaseKeyFor("sources/" + user.id);
		dispatch(addSource({ source: source, key: newKey }));
		// .then(() =>
		// 	navigate("/sources")
		// );
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
				<p>You need to log in to add a source...</p>
			</div>
		);

	return (
		<div
			className="add-source-page"
			style={{
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				color: theme === "light" ? "black" : "white",
			}}
		>
			<SourceForm onSubmit={handleSubmit} />
		</div>
	);
}
