"use client";
import { rtdb } from "@/firebaseConfig";
import { ref, onValue, Unsubscribe } from "firebase/database";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import useUser from "./useUser";
import { Note, NoteObjectForUpdate, Notes } from "@/types";
import { generateItemRef } from "@/lib/generateItemsRef";
import { addNote, deleteNote, updateNote } from "@/lib/crud/notes";

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

	const [notesNum, setNotesNum] = useState<number | null>(0);
	const [notes, setNotes] = useState<Notes | null>(null);

	const getNoteById = useCallback(
		(id: string) => {
			if (!notes) return null;

			return notes[id];
		},
		[notes]
	);

	const fetchAndListenToNote = useCallback(
		(id: string) => {
			if (!user) return;
			console.log("fetchAndListenToNote", id, "...");

			const noteRef = generateItemRef("notes", user.uid, id);

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
		},
		[user]
	);

	const fetchAndListenToNotes = useCallback(
		(ids: string[]) => {
			if (!ids.length) return;

			console.log("fetchAndListenToNotes:", ids, "...");

			ids.forEach((id) => fetchAndListenToNote(id));
		},
		[fetchAndListenToNote]
	);

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
		addNote: async (note: NoteObjectForUpdate) => {
			const addedNoteId = await addNote({ note, user });

			if (!addedNoteId) return null;

			fetchAndListenToNote(addedNoteId);
			return addedNoteId;
		},
		updateNote: async (note: NoteObjectForUpdate, noteId: string) =>
			updateNote({ note, noteId, user }),
		deleteNote: async (noteId: string) =>
			deleteNote({ noteId, noteToDelete: getNoteById(noteId), user }),
	};

	return (
		<NotesContext.Provider value={value}>{children}</NotesContext.Provider>
	);
}
