"use client";
import NoteCard from "@/components/NoteCard";
import PrivateRoute from "@/components/PrivateRoute";
import useNotes from "@/context/useNotes";
import { useEffect, useState } from "react";

function Note({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const [itemKey, setItemKey] = useState<string | undefined>(undefined);
	const { getNoteById } = useNotes();
	const note = itemKey ? getNoteById(itemKey) : null;

	useEffect(() => {
		async function getItemKey() {
			const slug = (await params).slug;
			console.log("slug:", slug);
			setItemKey(slug);
		}

		getItemKey();
	}, [params]);

	// always scroll to top:
	useEffect(() => window.scrollTo({ top: 0, behavior: "instant" }), []);

	if (!itemKey) return <p>There is no such note id...</p>
	if (!note) return <p>There is no such note...</p>

	return (
			<NoteCard
				key={"note-" + itemKey}
				note={note}
				noteKey={itemKey}
				show140chars={false}
			/>
	);
}

export default function NotePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	return (
		<PrivateRoute>
			<Note params={params} />
		</PrivateRoute>
	);
}