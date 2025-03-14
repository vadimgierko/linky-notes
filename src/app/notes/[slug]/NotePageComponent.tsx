"use client";
import NoteCard from "@/components/NoteCard";
import PrivateRoute from "@/components/PrivateRoute";
import useNotes from "@/context/useNotes";
import useUser from "@/context/useUser";
import { fetchNote } from "@/lib/crud/notes";
import { Note as INote } from "@/types";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

function NotePageComponent({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { user } = useUser();
	const [isLoading, setIsLoading] = useState(true);
	const [itemKey, setItemKey] = useState<string | undefined>(undefined);
	const { getNoteById, fetchAndListenToNote } = useNotes();
	const [note, setNote] = useState<INote | null>(null);
	const [error, setError] = useState<unknown | undefined>(undefined);

	useEffect(() => {
		async function getItemKey() {
			const slug = (await params).slug;
			console.log("slug:", slug);
			setItemKey(slug);
		}

		getItemKey();
	}, [params]);

	useEffect(() => {
		if (!user) return;
		if (!itemKey) return;
		if (!isLoading) return;

		const storedNote = getNoteById(itemKey);

		if (storedNote) {
			setNote(storedNote);
			setIsLoading(false);
		} else {
			fetchNote({ noteId: itemKey, user: user })
				.then(returnObj => {
					const { note: n, error } = returnObj;

					setError(error);
					setNote(n);
					setIsLoading(false);

					if (n) {
						// this code below sets listener & updates notes store:
						fetchAndListenToNote(n.id);
					}
				})
		}
	}, [isLoading, itemKey, user, fetchAndListenToNote, getNoteById]);

	if (!itemKey) return <p>There is no such note id...</p>;
	if (isLoading) return <Spinner />;
	if (error) return <p>Error while fetching a note... See console logs for futher information...</p>
	if (!note) return <p>There is no such note...</p>;

	return (
		<NoteCard
			key={"note-" + itemKey}
			note={note}
			noteKey={itemKey}
			show140chars={false}
		/>
	);
}

export default function NotePageComponentWrappedIntoPrivateRoute({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	return (
		<PrivateRoute>
			<NotePageComponent params={params} />
		</PrivateRoute>
	);
}
