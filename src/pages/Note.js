import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// custom components:
import NoteCard from "../components/NoteCard";

export default function Note() {
	const { itemKey } = useParams();
	const NOTES = useSelector((state) => state.notes.value);

	return (
		<>
			{NOTES[itemKey] ? (
				<>
					<NoteCard
						key={"item-" + itemKey}
						note={NOTES[itemKey]}
						noteKey={itemKey}
					/>
					<p className="text-center">
						<Link to="/" onClick={() => window.scrollTo({ top: 0 })}>
							back to notes
						</Link>
					</p>
				</>
			) : (
				<p>There is no such note...</p>
			)}
		</>
	);
}
