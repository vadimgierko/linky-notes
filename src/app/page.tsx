"use client";
import NoteCard from "@/components/NoteCard";
import useNotes from "@/context/useNotes";
import useUser from "@/context/useUser";
import sortNotes from "@/lib/sortNotes";
import { NoteWithId } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const { user } = useUser();
	const { notes } = useNotes();

	/**
	 * options: lastUpdated (default), firstUpdated, lastCreated, firstCreated
	 */
	const sortBy = searchParams.get("sortBy") || "lastUpdated";
	const searchTags = searchParams.get("tags");

	const NOTES_ARRAY: NoteWithId[] = notes
		? Object.keys(notes).map((id) => ({
				...notes[id],
				id,
		  }))
		: [];

	const sortedNotes = sortNotes(
		NOTES_ARRAY,
		sortBy as "lastUpdated" | "firstUpdated" | "lastCreated" | "firstCreated"
	); // ⚠️ note object consists noteId

	const filteredNotes = searchTags
		? sortedNotes.filter((note) =>
				searchTags
					.split("+")
					.every((element) => Object.keys(note.tags!).includes(element))
		  )
		: sortedNotes;

	useEffect(() => {
		if (!user) {
			router.push("signin");
		}
	}, [router, user]);

	return (
		<>
			<h1 className="text-center">
				Your Filtered Notes ({filteredNotes.length})
			</h1>
			<hr />
			<div className="sort">
				<select
					className="form-control mb-2"
					onChange={(e) =>
						searchTags
							? router.push(`?tags=${searchTags}&sortBy=${e.target.value}`)
							: router.push(`?sortBy=${e.target.value}`)
					}
					value={sortBy}
				>
					<option value="lastUpdated">last updated</option>
					<option value="firstUpdated">first updated</option>
					<option value="lastCreated">last created</option>
					<option value="firstCreated">first created</option>
				</select>
			</div>

			{filteredNotes.map((note) => (
				<NoteCard
					key={note.id}
					note={note}
					noteKey={note.id}
					show140chars={true}
				/>
			))}
		</>
	);
}
