"use client";
import NoteCard from "@/components/NoteCard";
import useNotes from "@/context/useNotes";
import useUser from "@/context/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const router = useRouter();
	const { user } = useUser();
	const { notes } = useNotes();

	useEffect(() => {
		if (!user) {
			router.push("signin");
		}
	}, [router, user]);

	return (
		<>
			<h1 className="text-center">
				Your Notes ({notes && Object.keys(notes).length})
			</h1>
			<hr />
			{notes &&
				Object.keys(notes).map((noteId) => (
					<NoteCard
						key={noteId}
						note={notes[noteId]}
						noteKey={noteId}
						show140chars={true}
					/>
				))}
		</>
	);
}
