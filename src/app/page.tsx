"use client";
import MarkdownRenderer from "@/components/MarkdownRenderer";
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
		<ul>
			{notes &&
				Object.keys(notes).map((noteId) => (
					<li key={noteId}>
						<MarkdownRenderer markdown={notes[noteId].content} />
					</li>
				))}
		</ul>
	);
}
