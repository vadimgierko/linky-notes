import { Note, SortBy } from "@/types";

export default function sortNotes(notes: Note[], sortBy: SortBy): Note[] {
	const sortedNotes = notes.sort((a, b) => {
		if (sortBy === "lastUpdated") {
			return b.updatedAt - a.updatedAt;
		} else if (sortBy === "firstUpdated") {
			return a.updatedAt - b.updatedAt;
		} else if (sortBy === "lastCreated") {
			return b.createdAt.auto - a.createdAt.auto;
		} else if (sortBy === "firstCreated") {
			return a.createdAt.auto - b.createdAt.auto;
		} else {
			// Default to sorting by lastUpdated if sortBy is invalid
			return b.updatedAt - a.updatedAt;
		}
	});

	return sortedNotes;
}
