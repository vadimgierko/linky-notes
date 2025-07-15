// import { Tag } from "@/types";
// import { REFACTOR_NOTES, REFACTOR_TAGS } from "./REFACTOR_NOTES_AND_TAGS";

// // CHECK IF EVERY TAG NOTES EXIST:
// export const tagsWithNonExistentNotes: Tag[] = [];

// export const doesEveryTagNoteExist: boolean = Object.keys(REFACTOR_TAGS).every(
// 	(tagId) => {
// 		const tag = REFACTOR_TAGS[tagId];
// 		if (!tag.notes) return true; // if tag has no notes, consider it as valid

// 		if (!Object.keys(tag.notes).every((noteId) => REFACTOR_NOTES[noteId])) {
// 			tagsWithNonExistentNotes.push(tag);
// 		}
// 		return Object.keys(tag.notes).every((noteId) => REFACTOR_NOTES[noteId]);
// 	}
// );
