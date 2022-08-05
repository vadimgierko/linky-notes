import { useTheme } from "../contexts/useTheme";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// custom components:
import NoteCard from "../components/NoteCard";

export default function Note() {
	const { theme } = useTheme();
	const { itemKey } = useParams();
	const NOTES = useSelector((state) => state.notes.value);

	if (!NOTES[itemKey])
		return (
			<div
				className="note-page"
				style={{
					backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
					color: theme === "light" ? "black" : "white",
				}}
			>
				<p>There is no such note...</p>
			</div>
		);

	return (
		<div
			className="note-page"
			style={{
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				color: theme === "light" ? "black" : "white",
			}}
		>
			<NoteCard
				key={"item-" + itemKey}
				note={NOTES[itemKey]}
				noteKey={itemKey}
			/>
		</div>
	);
}