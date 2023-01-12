import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
					{/* <p className="text-center">
						<Link to="/">back to notes</Link>
					</p> */}
				</>
			) : (
				<p>There is no such note...</p>
			)}
		</>
	);
}
