import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTheme } from "../contexts/useTheme";
// custom components:
import NoteForm from "../components/NoteForm";

export default function UpdateNote() {
	const { theme } = useTheme();
	const user = useSelector((state) => state.user.value);
	const { itemKey } = useParams();

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
			<NoteForm
				noteKey={itemKey}
				onSubmit={(e, note) => {
					e.preventDefault();
					console.log("Note updated:", note);
				}}
			/>
		</div>
	);
}
