"use client";
import NoteCard from "@/components/NoteCard";
import PrivateRoute from "@/components/PrivateRoute";
import useNotes from "@/context/useNotes";
import { Note as INote } from "@/types";
import { useEffect, useState, useCallback } from "react";
import { Spinner } from "react-bootstrap";

export default function NotePageComponent({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const [isLoading, setIsLoading] = useState(true);
	const [itemKey, setItemKey] = useState<string | undefined>(undefined);
	const { notes, fetchAndListenToNote } = useNotes();
	const [note, setNote] = useState<INote | null>(null);

	useEffect(() => {
		async function getItemKey() {
			const slug = (await params).slug;
			console.log("slug:", slug);
			setItemKey(slug);
		}

		getItemKey();
	}, [params]);

	const fetchNote = useCallback(
		(itemKey: string | undefined) => {
			if (itemKey) {
				fetchAndListenToNote(itemKey);
				setIsLoading(false);
			}
		},
		[fetchAndListenToNote]
	);

	useEffect(() => {
		if (!itemKey) return;

		const note = notes ? notes[itemKey] : null;

		if (note) {
			setNote(note);
			setIsLoading(false);
		} else {
			if (isLoading) {
				fetchNote(itemKey);
			} else {
				// there is no such note in rtdb...
				setNote(null);
			}
		}
	}, [fetchNote, isLoading, itemKey, notes]);

	if (!itemKey) return <p>There is no such note id...</p>;
	if (isLoading) return <Spinner />;
	if (!note) return <p>There is no such note...</p>;

	return (
		<PrivateRoute>
			<NoteCard
				key={"note-" + itemKey}
				note={note}
				noteKey={itemKey}
				show140chars={false}
			/>
		</PrivateRoute>
	);
}
