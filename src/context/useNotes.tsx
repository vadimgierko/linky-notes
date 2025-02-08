"use client";
import { rtdb } from "@/firebaseConfig";
import {
	ref,
	update,
	onValue,
	Unsubscribe,
	increment,
} from "firebase/database";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import useUser from "./useUser";
import { Note, NoteObjectForUpdate, Notes, Tag, Tags } from "@/types";
import createDate from "@/lib/createDate";
import generateFirebaseKeyFor from "@/lib/generateFirebaseKeyFor";
import useTags from "./useTags";
import generateItemsRef from "@/lib/generateItemsRef";

const NotesContext = createContext<{
	notes: Notes | null;
	notesNum: number | null;
	fetchAndListenToNote: (id: string) => void;
	fetchAndListenToNotes: (ids: string[]) => void;
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

type UnsubscribesObject = { [key: string]: Unsubscribe } | null;
const initUnsubscribesObject: UnsubscribesObject = null;

export function NotesProvider({ children }: NotesProviderProps) {
	const notesNumUnsubscribe = useRef<Unsubscribe | null>(null);
	// notes unsubscribes:
	const unsubscribes = useRef(initUnsubscribesObject);

	const { user } = useUser();
	const { getTagById } = useTags();

	const [notesNum, setNotesNum] = useState<number | null>(0);
	const [notes, setNotes] = useState<Notes | null>(null);

	const getNoteById = useCallback(
		(id: string) => {
			if (!notes) return null;

			return notes[id];
		},
		[notes]
	);

	function fetchAndListenToNote(id: string) {
		if (!user) return;
		console.log("fetchAndListenToNote", id, "...");

		const noteRef = generateItemsRef("notes", user.uid) + "/" + id;

		//==================== listen to updates: ====================//
		const unsubscribe = onValue(ref(rtdb, noteRef), (snapshot) => {
			if (snapshot.exists()) {
				const note = snapshot.val() as Note;
				console.log("DATA WAS FETCHED onValue: note of id", id, note);
				setNotes((prevNotes) =>
					prevNotes ? { ...prevNotes, [id]: note } : { [id]: note }
				);
			} else {
				setNotes((prevNotes) => {
					if (prevNotes) {
						const updatedNotes = { ...prevNotes };
						delete updatedNotes[id];
						return updatedNotes;
					}
					return prevNotes;
				});

				//unsubsribe
				if (unsubscribes.current) {
					const unsub = unsubscribes.current[id];
					unsub();
					delete unsubscribes.current[id];
					console.log("unsubscribes after delete:", unsubscribes.current);
				}
			}
		});

		if (unsubscribes.current) {
			unsubscribes.current[id] = unsubscribe;
			console.log("unsubscribes updated:", unsubscribes.current);
		}
		//============================================================//
	}

	function fetchAndListenToNotes(ids: string[]) {
		if (!ids.length) return;

		console.log("fetchAndListenToNotes:", ids, "...");

		ids.forEach((id) => fetchAndListenToNote(id));
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
	async function setNote(
		note: NoteObjectForUpdate,
		noteId: string,
		incrementNotesNum: boolean = false
	) {
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

			if (!updatedTag.notes) {
				return;
			}

			delete updatedTag.notes[noteId];

			tagsWithRemovedNoteIdToUpdate[tagId] = updatedTag;
		});

		// ❗❗❗ REMOVE NOTE ID FROM REMOVED TAGS ❗❗❗
		const tagsWithAddedNoteIdToUpdate: Tags = {};

		note.addedExistingTags.forEach((tagId) => {
			const updatedTag = getTagById(tagId);

			if (!updatedTag) return;
			if (!updatedTag.notes) return;

			updatedTag.notes[noteId] = true;

			tagsWithAddedNoteIdToUpdate[tagId] = updatedTag;
		});

		const notesRef = generateItemsRef("notes", user.uid);
		const tagsRef = generateItemsRef("tags", user.uid);
		//===========================================================
		// add note to rtdb & new tags using update
		const updates: { [key: string]: Note | Tag | object } = {};
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

		if (incrementNotesNum) {
			// increment notesNum:
			updates[`users/${user.uid}/notesNum`] = increment(1);
		}

		await update(ref(rtdb), updates);

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

		const newNote = await setNote(note, noteId, true);

		if (!newNote) return null;

		fetchAndListenToNote(newNote.id);

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

		// just in case...
		// note should be there,
		// becuase you can delete note only from the note card,
		// and that means, that the note was fetched:
		if (!noteToDelete) return alert("There is no note in state to delete...");

		const notesRef = generateItemsRef("notes", user.uid);
		const tagsRef = generateItemsRef("tags", user.uid);
		// collect updated tags & removed note:
		const updates: { [key: string]: Note | Tag | null | object } = {};

		// ❗❗❗ REMOVE NOTE ID FROM IT'S TAGS ❗❗❗
		const tagsToUpdate: Tags = {};
		Object.keys(noteToDelete.tags).forEach((tagId) => {
			const updatedTag = getTagById(tagId);

			if (!updatedTag) return;
			if (!updatedTag.notes) return;

			delete updatedTag.notes[noteId];

			tagsToUpdate[tagId] = updatedTag;
		});

		// remove note:
		updates[notesRef + "/" + noteId] = null;
		// update tags:
		Object.keys(tagsToUpdate).forEach((updatedTagId) => {
			updates[tagsRef + "/" + updatedTagId] = tagsToUpdate[updatedTagId];
		});

		// decrease notesNum:
		updates[`users/${user.uid}/notesNum`] = increment(-1);

		await update(ref(rtdb), updates);
	}

	useEffect(() => {
		if (user) {
			// LISTEN TO NOTES NUM:
			const unsubscribeNotesNum = onValue(
				ref(rtdb, `users/${user.uid}/notesNum`),
				(snapshot) => {
					if (snapshot.exists()) {
						const num = snapshot.val() as number;
						setNotesNum(num);
					} else {
						console.log("There is no notesNum value...");
						setNotesNum(null);
						// unsubscribe from notesNum:
						if (notesNumUnsubscribe.current) {
							notesNumUnsubscribe.current = null;
						}
					}
				}
			);

			notesNumUnsubscribe.current = unsubscribeNotesNum;
		} else {
			// NO USER => CLEAR STATE & UNSUBSCRIBE FROM ALL:
			setNotes(null);
			setNotesNum(null);
			// unsubscribe from notesNum:
			if (notesNumUnsubscribe.current) {
				notesNumUnsubscribe.current = null;
			}
			console.log(
				"User logged out. Unsub notesNum & clear notesNumUnsubscribe:",
				notesNumUnsubscribe.current
			);
			// clear notes unsubscribes:
			if (unsubscribes.current) {
				Object.values(unsubscribes.current).forEach((unsub) => {
					unsub();
				});
				unsubscribes.current = initUnsubscribesObject;
			}

			console.log(
				"User logged out. Unsub all notes & clear unsubscribes object:",
				unsubscribes.current
			);
		}
	}, [user]);

	const value = {
		notes,
		notesNum,
		fetchAndListenToNote,
		fetchAndListenToNotes,
		getNoteById,
		addNote,
		updateNote,
		deleteNote,
	};

	return (
		<NotesContext.Provider value={value}>{children}</NotesContext.Provider>
	);
}
