import { useSelector } from "react-redux";
import { useTheme } from "../../contexts/useTheme";
// custom components:
import NoteForm from "../../components/NoteForm";

export default function AddNote() {
	const { theme } = useTheme();
	const user = useSelector((state) => state.user.value);

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
			<NoteForm
				onSubmit={(e, note) => {
					e.preventDefault();
					console.log("Note added:", note);
				}}
			/>
		</div>
	);
}
