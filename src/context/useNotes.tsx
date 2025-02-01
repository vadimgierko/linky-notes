"use client";
import { rtdb } from "@/firebaseConfig";
import { ref, update, onValue } from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";
import useUser from "./useUser";
import { Note, NoteObjectForUpdate, Notes, Tag, Tags } from "@/types";
import createDate from "@/lib/createDate";
import generateFirebaseKeyFor from "@/lib/generateFirebaseKeyFor";
import useTags from "./useTags";
import generateItemsRef from "@/lib/generateItemsRef";

const NotesContext = createContext<{
	notes: Notes | null;
	isFetching: boolean;
	getNoteById: (id: string) => Note | null;
	addNote: (note: NoteObjectForUpdate) => Promise<string | null>;
	updateNote: (
		note: NoteObjectForUpdate,
		noteId: string
	) => Promise<Note | null>;
	deleteNote: (noteId: string) => Promise<void>;
} | null>(null);

export default function useNotes() {
	const context = useContext(NotesContext);

	if (!context) {
		throw new Error("useNotes has to be used within <NotesContext.Provider>");
	}

	return context;
}

interface NotesProviderProps {
	children: React.ReactNode;
}

export function NotesProvider({ children }: NotesProviderProps) {
	const { user } = useUser();
	const { setTags, getTagById } = useTags();

	const [notes, setNotes] = useState<Notes | null>(null);

	const [isFetching, setIsFetching] = useState(true);

	function getNoteById(id: string) {
		if (!notes) return null;

		return notes[id];
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
	async function setNote(note: NoteObjectForUpdate, noteId: string) {
		// CHECKS:
		if (!user) {
			console.error("Cannot set note when user is not logged...");
			return null;
		}

		if (!note.content.trim().length) {
			console.error("Your note has no content! Cannot set the note...");
			return null;
		}

		const date = createDate();

		const updatedNote: Note = {
			content: note.content,
			createdAt: note.createdAt || date,
			updatedAt: date,
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
					tag: newTag,
					createdAt: date,
					userId: user.uid,
					id: tagId,
					updatedAt: date,
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
			const updatedTag = getTagById(tagId);

			if (!updatedTag) return;

			delete updatedTag.notes![noteId];

			tagsWithRemovedNoteIdToUpdate[tagId] = updatedTag;
		});

		// ❗❗❗ REMOVE NOTE ID FROM REMOVED TAGS ❗❗❗
		const tagsWithAddedNoteIdToUpdate: Tags = {};

		note.addedExistingTags.forEach((tagId) => {
			const updatedTag = getTagById(tagId);

			if (!updatedTag) return;

			updatedTag.notes![noteId] = true;

			tagsWithAddedNoteIdToUpdate[tagId] = updatedTag;
		});

		const notesRef = generateItemsRef("notes", user.uid);
		const tagsRef = generateItemsRef("tags", user.uid);
		//===========================================================
		// add note to rtdb & new tags using update
		const updates: { [key: string]: Note | Tag } = {};
		// update note in rtdb:
		updates[notesRef + "/" + noteId] = updatedNote;
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

		await update(ref(rtdb), updates);

		// update notes
		setNotes((prevNotes) => ({ ...prevNotes, [noteId]: updatedNote }));
		// update tags
		setTags((prevTags) => ({ ...prevTags, ...tagsToAdd }));

		return updatedNote;
	}

	async function addNote(note: NoteObjectForUpdate) {
		if (!user) {
			console.error("Cannot add note when user is not logged...");
			return null;
		}

		const noteId = generateFirebaseKeyFor("notes", user.uid);

		if (!noteId) {
			console.error("No noteId! Cannot add the note...");
			return null;
		}

		const newNote = await setNote(note, noteId);

		if (!newNote) return null;

		return newNote.id;
	}

	async function updateNote(note: NoteObjectForUpdate, noteId: string) {
		const updatedNote = await setNote(note, noteId);

		return updatedNote;
	}

	async function deleteNote(noteId: string) {
		if (!user) {
			console.error("Cannot delete note when user is not logged...");
			return;
		}

		const noteToDelete = getNoteById(noteId);

		if (!noteToDelete) return;

		const notesRef = generateItemsRef("notes", user.uid);
		const tagsRef = generateItemsRef("tags", user.uid);
		// collect updated tags & removed note:
		const updates: { [key: string]: Note | Tag | null } = {};

		// ❗❗❗ REMOVE NOTE ID FROM IT'S TAGS ❗❗❗
		const tagsToUpdate: Tags = {};
		Object.keys(noteToDelete.tags).forEach((tagId) => {
			const updatedTag = getTagById(tagId);

			if (!updatedTag) return;

			delete updatedTag.notes![noteId];

			tagsToUpdate[tagId] = updatedTag;
		});

		// remove note:
		updates[notesRef + "/" + noteId] = null;
		// update tags:
		Object.keys(tagsToUpdate).forEach((updatedTagId) => {
			updates[tagsRef + "/" + updatedTagId] = tagsToUpdate[updatedTagId];
		});

		await update(ref(rtdb), updates);

		setNotes((prevNotes) => {
			if (prevNotes) {
				const updatedNotes = { ...prevNotes };
				delete updatedNotes[noteId];
				return updatedNotes;
			}
			return prevNotes;
		});

		setTags((prevTags) => ({ ...prevTags, ...tagsToUpdate }));
	}

	useEffect(() => {
		async function fetchNotes(reference: string) {
			return onValue(
				ref(rtdb, reference),
				(snapshot) => {
					const data = snapshot.val() as Notes;
					console.log("DATA WAS FETCHED: ALL USER'S ITEMS FROM", reference);
					console.log("fetchedItems:", data);
					setNotes(data);
					setIsFetching(false);
				},
				{
					onlyOnce: true,
				}
			);
		}

		if (!user) {
			setNotes(null);
		} else {
			fetchNotes(generateItemsRef("notes", user.uid));
		}
	}, [user]);

	const value = {
		notes,
		isFetching,
		getNoteById,
		addNote,
		updateNote,
		deleteNote,
	};

	return (
		<NotesContext.Provider value={value}>{children}</NotesContext.Provider>
	);
}
