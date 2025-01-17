"use client";
import { rtdb } from "@/firebaseConfig";
import { ref, get, query, limitToLast, update } from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";
import useUser from "./useUser";
import { Note, Tag } from "@/types";
import { NoteObjectForUpdate } from "@/components/NoteForm";
import createDate from "@/lib/createDate";
import generateFirebaseKeyFor from "@/lib/generateFirebaseKeyFor";

const NotesContext = createContext<{
	notes: { [key: string]: Note } | null;
	tags: {
		[key: string]: Tag;
	} | null;
	getNoteById: (id: string) => Note | null;
	addNote: (note: NoteObjectForUpdate) => Promise<string | null>;
	updateNote: (note: NoteObjectForUpdate, noteId: string) => Promise<Note | null>
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
	const [notes, setNotes] = useState<{ [key: string]: Note } | null>(null);
	// filter tags from notes
    const tags = notes
    ? Object.keys(notes).reduce((cumulatedTags, noteId) => {
        const note = notes[noteId] 
        return {
            ...cumulatedTags,
            ...(note.tags ? note.tags : {}) // we do not check for unique tags, becuase it will be overwritten
        }
    }, {} as { [key: string]: Tag })
    : null

	function getNoteById(id: string) {
		if (!notes) return null;

		return notes[id];
	}

	async function addNote(note: NoteObjectForUpdate) {
		// CHECKS:
		if (!user) {
			console.error("Cannot add note when user is not logged...");
			return null;
		}

		if (!note.content.trim().length) {
			console.error("Your note has no content! Cannot add the note...");
			return null
		}

		const noteId = generateFirebaseKeyFor("items", user.uid);

		if (!noteId) {
			console.error("No noteId! Cannot add the note...");
			return null
		}

		const date = createDate();

		const newNote: Note = {
			content: note.content,
			createdAt: date,
			pages: note.pages,
			sourceKey: note.sourceKey,
			updatedAt: date,
			userId: user.uid,
			tags: note.existingTags
		}
		// check for new tags to add:
		const tagsToAdd: { [key: string]: Tag } = {};

		if (note.newTags && note.newTags.length) {
			console.log("There are new tags to add to database!");

			note.newTags.forEach((newTag) => {
				//console.log("There is a new tag to add to database:", newTag);
				const tagId = generateFirebaseKeyFor("tags", user.uid);

				if (!tagId) {
					console.error("No tagId provided for the new tag... Cannot add tag & note...");
					return null
				}

				const newTagObject: Tag = {
					tag: newTag,
					createdAt: date,
					userId: user.uid,
				}

				// update new tags
				tagsToAdd[tagId] = newTagObject;
				// update note tags
				newNote.tags = {
					...newNote.tags,
					[tagId]: newTagObject,
				}
			});
		} else {
			console.log("There are no new tags to add to database!");
		}

		const notesRef = "items/" + user.uid + "/";
		const tagsRef = "tags/" + user.uid + "/";
		//===========================================================
		// add note to rtdb & new tags using update
		const updates: {[key: string]: Note | Tag} = {}
		// update note in rtdb:
		updates[notesRef + noteId] = newNote;
		// update new tags in rtdb:
		Object.keys(tagsToAdd).forEach(newTagId => {
			updates[tagsRef + newTagId] = tagsToAdd[newTagId];
		});

		await update(ref(rtdb), updates);

		// update notes (tags will be updated automatically from notes)
		setNotes(prevNotes => ({...prevNotes, [noteId]: newNote}));

		return noteId
	}

	async function updateNote(note: NoteObjectForUpdate, noteId: string) {
		// CHECKS:
		if (!user) {
			console.error("Cannot add note when user is not logged...");
			return null;
		}

		if (!note.content.trim().length) {
			console.error("Your note has no content! Cannot add the note...");
			return null
		}

		if (!noteId) {
			console.error("No noteId! Cannot add the note...");
			return null
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
			tags: note.existingTags
		}
		// check for new tags to add:
		const tagsToAdd: { [key: string]: Tag } = {};

		if (note.newTags && note.newTags.length) {
			console.log("There are new tags to add to database!");

			note.newTags.forEach((newTag) => {
				//console.log("There is a new tag to add to database:", newTag);
				const tagId = generateFirebaseKeyFor("tags", user.uid);

				if (!tagId) {
					console.error("No tagId provided for the new tag... Cannot add tag & note...");
					return null
				}

				const newTagObject: Tag = {
					tag: newTag,
					createdAt: date,
					userId: user.uid,
				}

				// update new tags
				tagsToAdd[tagId] = newTagObject;
				// update note tags
				updatedNote.tags = {
					...updatedNote.tags,
					[tagId]: newTagObject,
				}
			});
		} else {
			console.log("There are no new tags to add to database!");
		}

		const notesRef = "items/" + user.uid + "/";
		const tagsRef = "tags/" + user.uid + "/";
		//===========================================================
		// update note in rtdb & new tags using update
		const updates: {[key: string]: Note | Tag} = {}
		// update note in rtdb:
		updates[notesRef + noteId] = updatedNote;
		// update new tags in rtdb:
		Object.keys(tagsToAdd).forEach(newTagId => {
			updates[tagsRef + newTagId] = tagsToAdd[newTagId];
		});

		await update(ref(rtdb), updates);

		// update notes (tags will be updated automatically from notes)
		setNotes(prevNotes => ({...prevNotes, [noteId]: updatedNote}));

		return updatedNote;
	}

	useEffect(() => {
		async function fetchNotes(reference: string) {
			try {
				// const snapshot = await get(ref(rtdb, reference)); => fetches all notes

				const firstTenNotesRef = query(ref(rtdb, reference), limitToLast(10));
				const snapshot = await get(firstTenNotesRef);

				if (snapshot.exists()) {
					const data = snapshot.val() as { [key: string]: Note };
					console.log("DATA WAS FETCHED: ALL USER'S ITEMS FROM", reference);
					console.log("fetchedItems:", data);
					setNotes(data);
				} else {
					console.log("There are no items at", reference);
					setNotes(null);
				}
			} catch (error: unknown) {
				console.error(error);
				setNotes(null);
			}
		}

		if (!user) {
			setNotes(null);
		} else {
			fetchNotes("items/" + user.uid);
		}
	}, [user]);

	const value = {
		notes,
		tags,
		getNoteById,
		addNote,
		updateNote
	};

	return (
		<NotesContext.Provider value={value}>{children}</NotesContext.Provider>
	);
}
