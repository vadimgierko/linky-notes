"use client";
import { rtdb } from "@/firebaseConfig";
import { ref, update, remove, onValue, get, set } from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";
import useUser from "./useUser";
import { Note, Tag } from "@/types";
import { NoteObjectForUpdate } from "@/components/NoteForm";
import createDate from "@/lib/createDate";
import generateFirebaseKeyFor from "@/lib/generateFirebaseKeyFor";
import useTags from "./useTags";

const NotesContext = createContext<{
	notes: { [key: string]: Note } | null;
	isFetching: boolean;
	getTagNotesNum: (tagId: string) => number; // | undefined
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
	const { tags, setTags } = useTags();
	const [notes, setNotes] = useState<{ [key: string]: Note } | null>(null);

	const [areNotesMappedToTags, setAreNotesMappedToTags] = useState(false);

	// helper var:
	const NOTES_ARRAY = notes
		? Object.keys(notes).map((id) => ({ ...notes[id], id }))
		: [];

	const [isFetching, setIsFetching] = useState(true);

	function getNoteById(id: string) {
		if (!notes) return null;

		return notes[id];
	}

	function getTagNotesNum(tagId: string) {
		return NOTES_ARRAY.filter((note) => (note.tags ? note.tags[tagId] : false))
			.length;
	}

	async function addNote(note: NoteObjectForUpdate) {
		// CHECKS:
		if (!user) {
			console.error("Cannot add note when user is not logged...");
			return null;
		}

		if (!note.content.trim().length) {
			console.error("Your note has no content! Cannot add the note...");
			return null;
		}

		const noteId = generateFirebaseKeyFor("items", user.uid);

		if (!noteId) {
			console.error("No noteId! Cannot add the note...");
			return null;
		}

		const date = createDate();

		const newNote: Note = {
			content: note.content,
			createdAt: date,
			pages: note.pages,
			sourceKey: note.sourceKey,
			updatedAt: date,
			userId: user.uid,
			tags: note.existingTags,
		};
		// check for new tags to add:
		const tagsToAdd: { [key: string]: Tag } = {};

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
				};

				// update new tags
				tagsToAdd[tagId] = newTagObject;
				// update note tags
				newNote.tags = {
					...newNote.tags,
					[tagId]: newTagObject,
				};
			});
		} else {
			console.log("There are no new tags to add to database!");
		}

		const notesRef = "items/" + user.uid + "/";
		const tagsRef = "tags/" + user.uid + "/";
		//===========================================================
		// add note to rtdb & new tags using update
		const updates: { [key: string]: Note | Tag } = {};
		// update note in rtdb:
		updates[notesRef + noteId] = newNote;
		// update new tags in rtdb:
		Object.keys(tagsToAdd).forEach((newTagId) => {
			updates[tagsRef + newTagId] = tagsToAdd[newTagId];
		});

		await update(ref(rtdb), updates);

		// update notes
		setNotes((prevNotes) => ({ ...prevNotes, [noteId]: newNote }));
		// update tags
		setTags((prevTags) => ({ ...prevTags, ...tagsToAdd }));

		return noteId;
	}

	async function updateNote(note: NoteObjectForUpdate, noteId: string) {
		// CHECKS:
		if (!user) {
			console.error("Cannot add note when user is not logged...");
			return null;
		}

		if (!note.content.trim().length) {
			console.error("Your note has no content! Cannot add the note...");
			return null;
		}

		if (!noteId) {
			console.error("No noteId! Cannot add the note...");
			return null;
		}

		const date = createDate();

		const prevNote = getNoteById(noteId);

		if (!prevNote) {
			console.error("No such note found... Cannot update the note...");
			return null;
		}

		const updatedNote: Note = {
			content: note.content,
			createdAt: prevNote.createdAt,
			pages: note.pages,
			sourceKey: note.sourceKey,
			updatedAt: date,
			userId: user.uid,
			tags: note.existingTags,
		};
		// check for new tags to add:
		const tagsToAdd: { [key: string]: Tag } = {};

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
				};

				// update new tags
				tagsToAdd[tagId] = newTagObject;
				// update note tags
				updatedNote.tags = {
					...updatedNote.tags,
					[tagId]: newTagObject,
				};
			});
		} else {
			console.log("There are no new tags to add to database!");
		}

		const notesRef = "items/" + user.uid + "/";
		const tagsRef = "tags/" + user.uid + "/";
		//===========================================================
		// update note in rtdb & new tags using update
		const updates: { [key: string]: Note | Tag } = {};
		// update note in rtdb:
		updates[notesRef + noteId] = updatedNote;
		// update new tags in rtdb:
		Object.keys(tagsToAdd).forEach((newTagId) => {
			updates[tagsRef + newTagId] = tagsToAdd[newTagId];
		});

		await update(ref(rtdb), updates);

		// update notes
		setNotes((prevNotes) => ({ ...prevNotes, [noteId]: updatedNote }));
		// update tags
		// update tags
		setTags((prevTags) => ({ ...prevTags, ...tagsToAdd }));

		return updatedNote;
	}

	async function deleteNote(noteId: string) {
		if (!user) {
			console.error("Cannot delete note when user is not logged...");
			return;
		}

		await remove(ref(rtdb, "items/" + user.uid + "/" + noteId));

		setNotes((prevNotes) => {
			if (prevNotes) {
				const updatedNotes = { ...prevNotes };
				delete updatedNotes[noteId];
				return updatedNotes;
			}
			return prevNotes;
		});
	}

	useEffect(() => {
		async function fetchNotes(reference: string) {
			return onValue(
				ref(rtdb, reference),
				(snapshot) => {
					const data = snapshot.val() as { [key: string]: Note };
					console.log("DATA WAS FETCHED: ALL USER'S ITEMS FROM", reference);
					console.log("fetchedItems:", data);
					setNotes(data);
					setIsFetching(false);
				},
				{
					onlyOnce: true,
				}
			);

			// try {
			// 	const snapshot = await get(ref(rtdb, reference)); // => fetches all notes

			// 	// const firstTenNotesRef = query(ref(rtdb, reference), limitToLast(10));
			// 	// const snapshot = await get(firstTenNotesRef);

			// 	if (snapshot.exists()) {
			// 		const data = snapshot.val() as { [key: string]: Note };
			// 		console.log("DATA WAS FETCHED: ALL USER'S ITEMS FROM", reference);
			// 		console.log("fetchedItems:", data);
			// 		setNotes(data);
			// 	} else {
			// 		console.log("There are no items at", reference);
			// 		setNotes(null);
			// 	}
			// } catch (error: unknown) {
			// 	console.error(error);
			// 	setNotes(null);
			// } finally {
			// 	setIsFetching(false);
			// }
		}

		if (!user) {
			setNotes(null);
		} else {
			fetchNotes("items/" + user.uid)
		}
	}, [user]);

	// check if user's notes are mapped to tag-notes
	// if no => map!
	useEffect(() => {
		if (areNotesMappedToTags) return;

		if (!user) return;
		// ❗ there must be at least 1 tag & 1 note ❗
		if (!tags) return;
		if (!notes) return;

		const LOCAL_NOTES_ARRAY = notes
				? Object.keys(notes).map((id) => ({ ...notes[id], id }))
				: [];

		function getTagNotesIdsArray(tagId: string) {
			return LOCAL_NOTES_ARRAY
				.filter((note) => (note.tags ? note.tags[tagId] : false))
				.map(note => note.id);
		}

		async function mapNotesToTagNotesInRTDB() {
			if (!user) return;
			if (!tags) return
			// check if there is /tag-notes/userId/firstTagId in db
			// just to check
			const firstTagId = LOCAL_NOTES_ARRAY[0].tags && Object.keys(LOCAL_NOTES_ARRAY[0].tags)[0];
			const firstTagNotesSnap = await get(ref(rtdb, `tag-notes/${user.uid}/${firstTagId}`));

			if (firstTagNotesSnap.exists()) {
				console.log("Notes are already mapped to tag-notes.");
				setAreNotesMappedToTags(true);
			} else {
				console.log("No tag-notes. Mapping notes to tag-notes...");

				if (!tags) return;

				const userTagNotesObject: { [key: string]: { [key: string]: true } } = {}

				Object.keys(tags).forEach(tagId => {
					const tagNotes: { [key: string]: true } = getTagNotesIdsArray(tagId)
						.reduce((prev, curr) => ({ ...prev, [curr]: true }), {});

					userTagNotesObject[tagId] = tagNotes
				})

				await set(ref(rtdb, "tag-notes/" + user.uid), userTagNotesObject);

				console.log("User tag-notes was set!");
				setAreNotesMappedToTags(true);
			}
		}

		mapNotesToTagNotesInRTDB();
	}, [notes, tags, user, areNotesMappedToTags]);

	const value = {
		notes,
		isFetching,
		getTagNotesNum,
		getNoteById,
		addNote,
		updateNote,
		deleteNote,
	};

	return (
		<NotesContext.Provider value={value}>{children}</NotesContext.Provider>
	);
}
