"use client";
import { rtdb } from "@/firebaseConfig";
import { ref, get, query, limitToLast } from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";
import useUser from "./useUser";
import { Note } from "@/types";

const NotesContext = createContext<{
	notes: { [key: string]: Note } | null;
	getNoteById: (id: string) => Note | null;
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

	function getNoteById(id: string) {
		if (!notes) return null;

		return notes[id];
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
		getNoteById,
	};

	return (
		<NotesContext.Provider value={value}>{children}</NotesContext.Provider>
	);
}
