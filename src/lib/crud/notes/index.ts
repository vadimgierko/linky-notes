import { rtdb } from "@/firebaseConfig";
import date from "@/lib/date";
import generateFirebaseKeyFor from "@/lib/generateFirebaseKeyFor";
import { generateItemRef, generateItemsRef } from "@/lib/generateItemsRef";
import userStorageObject from "@/lib/userStorageObject";
import { Note, NoteObjectForUpdate, Tag, Tags } from "@/types";
import { User } from "firebase/auth";
import { get, increment, ref, update } from "firebase/database";

export async function fetchNote({
	noteId,
	user,
}: {
	noteId?: string;
	user: User | null;
}) {
	type ReturnObj = { note: Note | null; error: unknown | undefined };
	const returnObj: ReturnObj = { note: null, error: undefined };

	try {
		if (!noteId) return returnObj;
		if (!user) return returnObj;

		const noteRef = generateItemRef("notes", user.uid, noteId);
		const noteSnapshot = await get(ref(rtdb, noteRef));

		if (noteSnapshot.exists()) {
			const note = noteSnapshot.val() as Note;
			console.log("fetchNote(): note of id", noteId, "was fetched:", note);
			returnObj["note"] = note;
		} else {
			console.log("There is no note of id", noteId, "in rtdb...");
			returnObj["note"] = null;
		}
	} catch (error: unknown) {
		console.error(error);
		returnObj["error"] = error;
	} finally {
		return returnObj;
	}
}

/**
 * Internal helper function
 * to be reused in `addNote()` & `updateNote()`.
 *
 * It transforms `NoteObjectForUpdate` into the `Note`,
 * updates existing tags with `noteId`,
 * transforms newly created tags into `Tag`s,
 * updates RTDB & returns updated `Note`.
 */
async function setNote({
	note,
	noteId,
	incrementNotesNum,
	user,
}: {
	note: NoteObjectForUpdate;
	noteId: string;
	incrementNotesNum: boolean;
	user: User | null;
}) {
	// CHECKS:
	if (!user) {
		console.error("Cannot set note when user is not logged...");
		return null;
	}

	if (!note.children[0].value.trim().length) {
		console.error("Your note has no content! Cannot set the note...");
		return null;
	}

	const timestamp = date.getTimestamp();

	const updatedNote: Note = {
		children: note.children,
		createdAt: note.createdAt.auto ? note.createdAt : { auto: timestamp },
		updatedAt: timestamp,
		userId: note.userId || user.uid,
		tags: note.existingTags,
		id: noteId,
	};

	// check for new tags to add:
	const tagsToAdd: Tags = {};

	if (note.newTags && note.newTags.length) {
		console.log("There are new tags to add to database!");

		note.newTags.forEach((newTag) => {
			//console.log("There is a new tag to add to database:", newTag);
			const tagId = generateFirebaseKeyFor("tags", user.uid);

			if (!tagId) {
				console.error(
					"No tagId provided for the new tag... Cannot add tag & note..."
				);
				return null;
			}

			const newTagObject: Tag = {
				value: newTag,
				createdAt: { auto: timestamp },
				userId: user.uid,
				id: tagId,
				updatedAt: timestamp,
				notes: {
					[noteId]: true,
				},
			};

			// update new tags
			tagsToAdd[tagId] = newTagObject;
			// update note tags
			updatedNote.tags = {
				...updatedNote.tags,
				[tagId]: true,
			};
		});
	} else {
		console.log("There are no new tags to add to database!");
	}

	// ❗❗❗ REMOVE NOTE ID FROM REMOVED TAGS ❗❗❗
	const tagsWithRemovedNoteIdToUpdate: Tags = {};

	note.removedExistingTags.forEach((tagId) => {
		const updatedTag = userStorageObject.getTagById({
			tagId,
			userId: user.uid,
		});

		if (!updatedTag) return;

		if (!updatedTag.notes) {
			return;
		}

		delete updatedTag.notes[noteId];
		updatedTag.updatedAt = timestamp;

		tagsWithRemovedNoteIdToUpdate[tagId] = updatedTag;
	});

	// ❗❗❗ ADD NOTE ID TO ADDED TAGS ❗❗❗
	const tagsWithAddedNoteIdToUpdate: Tags = {};

	note.addedExistingTags.forEach((tagId) => {
		const updatedTag = userStorageObject.getTagById({
			tagId,
			userId: user.uid,
		});

		if (!updatedTag) return console.error("No updatedTag with id:", tagId);
		if (!updatedTag.notes) {
			updatedTag.notes = { [noteId]: true };
		} else {
			updatedTag.notes[noteId] = true;
		}
		updatedTag.updatedAt = timestamp;

		tagsWithAddedNoteIdToUpdate[tagId] = updatedTag;
	});

	const noteRef = generateItemRef("notes", user.uid, noteId);
	const tagsRef = generateItemsRef("tags", user.uid);
	//===========================================================
	// add note to rtdb & new tags using update
	const updates: { [key: string]: Note | Tag | object | number } = {};
	// update note in rtdb:
	updates[noteRef] = updatedNote;
	// update new tags in rtdb:
	Object.keys(tagsToAdd).forEach((newTagId) => {
		updates[tagsRef + "/" + newTagId] = tagsToAdd[newTagId];
	});
	// update tags with removed noteId in rtdb:
	Object.keys(tagsWithRemovedNoteIdToUpdate).forEach((tagId) => {
		updates[tagsRef + "/" + tagId] = tagsWithRemovedNoteIdToUpdate[tagId];
	});
	// update tags with added noteId in rtdb:
	Object.keys(tagsWithAddedNoteIdToUpdate).forEach((tagId) => {
		updates[tagsRef + "/" + tagId] = tagsWithAddedNoteIdToUpdate[tagId];
	});
	// UPDATE EVENTS:
	Object.keys({
		...tagsWithRemovedNoteIdToUpdate,
		...tagsWithAddedNoteIdToUpdate,
	}).forEach((tagId) => {
		const eventsRef = `events/${user.uid}/tags/updated/${tagId}`;
		updates[eventsRef] = timestamp;
	});

	if (incrementNotesNum) {
		// increment notesNum:
		updates[`users/${user.uid}/notesNum`] = increment(1);
	}

	if (Object.keys(tagsToAdd).length) {
		// increment tagsNum:
		updates[`users/${user.uid}/tagsNum`] = increment(
			Object.keys(tagsToAdd).length
		);
	}

	await update(ref(rtdb), updates);

	return updatedNote;
}

export async function addNote({
	note,
	user,
}: {
	note: NoteObjectForUpdate;
	user: User | null;
}) {
	if (!user) {
		console.error("Cannot add note when user is not logged...");
		return null;
	}

	const noteId = generateFirebaseKeyFor("notes", user.uid);

	if (!noteId) {
		console.error("No noteId! Cannot add the note...");
		return null;
	}

	const newNote = await setNote({
		note,
		noteId,
		user,
		incrementNotesNum: true,
	});

	if (!newNote) return null;

	return newNote.id;
}

export async function updateNote({
	note,
	noteId,
	user,
}: {
	note: NoteObjectForUpdate;
	noteId: string;
	user: User | null;
}) {
	const updatedNote = await setNote({
		note,
		noteId,
		user,
		incrementNotesNum: false,
	});

	return updatedNote;
}

export async function deleteNote({
	noteId,
	noteToDelete,
	user,
}: {
	noteId: string;
	noteToDelete: Note | null;
	user: User | null;
}) {
	if (!user) {
		console.error("Cannot delete note when user is not logged...");
		return;
	}

	// just in case...
	// note should be there,
	// becuase you can delete note only from the note card,
	// and that means, that the note was fetched:
	if (!noteToDelete) return alert("There is no note in state to delete...");

	const tagsRef = generateItemsRef("tags", user.uid);
	// collect updated tags & removed note:
	const updates: { [key: string]: Note | Tag | null | object | number } = {};

	const timestamp = date.getTimestamp();
	// ❗❗❗ REMOVE NOTE ID FROM IT'S TAGS ❗❗❗
	const tagsToUpdate: Tags = {};
	Object.keys(noteToDelete.tags).forEach((tagId) => {
		const updatedTag = userStorageObject.getTagById({
			tagId,
			userId: user.uid,
		});

		if (!updatedTag) return;
		if (!updatedTag.notes) return;

		delete updatedTag.notes[noteId];
		updatedTag.updatedAt = timestamp;

		tagsToUpdate[tagId] = updatedTag;
	});

	// remove note:
	const removedNoteRef = generateItemRef("notes", user.uid, noteId);
	updates[removedNoteRef] = null;
	// update tags:
	Object.keys(tagsToUpdate).forEach((updatedTagId) => {
		updates[tagsRef + "/" + updatedTagId] = tagsToUpdate[updatedTagId];
	});
	// UPDATE EVENTS:
	Object.keys(tagsToUpdate).forEach((tagId) => {
		const eventsRef = `events/${user.uid}/tags/updated/${tagId}`;
		updates[eventsRef] = tagsToUpdate[tagId].updatedAt;
	});

	// decrease notesNum:
	updates[`users/${user.uid}/notesNum`] = increment(-1);

	await update(ref(rtdb), updates);
}
