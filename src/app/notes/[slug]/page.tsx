"use client";
import NoteCard from "@/components/NoteCard";
import useNotes from "@/context/useNotes";
import { useEffect, useState } from "react";

export default function Note({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const [itemKey, setItemKey] = useState<string | undefined>(undefined);
	const { notes } = useNotes();

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

	return (
		<>
			{notes && itemKey && notes[itemKey] ? (
				<>
					<NoteCard
						key={"item-" + itemKey}
						note={notes[itemKey]}
						noteKey={itemKey}
						show140chars={false}
					/>
				</>
			) : (
				<p>There is no such note...</p>
			)}
		</>
	);
}
