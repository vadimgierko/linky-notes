import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// custom components:
import NoteCard from "../components/NoteCard";

export default function Note() {
	const { itemKey } = useParams();
	const NOTES = useSelector((state) => state.notes.value);

	// always scroll to top:
	useEffect(() => window.scrollTo({ top: 0, behavior: "instant" }), []);

	return (
		<>
			{NOTES[itemKey] ? (
				<>
					<NoteCard
						key={"item-" + itemKey}
						note={NOTES[itemKey]}
						noteKey={itemKey}
					/>
				</>
			) : (
				<p>There is no such note...</p>
			)}
		</>
	);
}
