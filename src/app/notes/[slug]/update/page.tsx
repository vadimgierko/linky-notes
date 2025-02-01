"use client";

import NoteForm from "@/components/NoteForm";
import PrivateRoute from "@/components/PrivateRoute";
import useNotes from "@/context/useNotes";
import { NoteObjectForUpdate } from "@/types";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

function UpdateNote({ params }: { params: Promise<{ slug: string }> }) {
	const router = useRouter();
	const { updateNote } = useNotes();
	const [noteId, setNoteId] = useState<string | undefined>(undefined);

	const [isUpdating, setIsUpdating] = useState(false);

	async function handleSubmit(
		e: FormEvent<HTMLFormElement>,
		note: NoteObjectForUpdate
	) {
		e.preventDefault();
		console.log("Note to update:", note);

		if (!note.content.length)
			return alert(
				"Your note is empty! Add some content to your note to add it to database."
			);

		if (!Object.keys(note.existingTags).length && !note.newTags.length)
			return alert(
				"Your note has no tags! Add at least 1 tag to add it to database."
			);

		setIsUpdating(true);

		if (!noteId) {
			setIsUpdating(false);
			return console.error("No note id provided... Cannot update note...");
		}

		const updatedNote = await updateNote(note, noteId);

		if (!updatedNote) return alert("Cannot update the note...");

		console.log("Note was updated:", updatedNote);

		// navigate to updated note:
		router.push("/notes/" + noteId);
	}

	function handleCancel() {
		return router.back();
	}

	// get note id:
	useEffect(() => {
		async function getItemKey() {
			const slug = (await params).slug;
			console.log("slug:", slug);
			setNoteId(slug);
		}

		getItemKey();
	}, [params]);

	if (!noteId)
		return (
			<p className="text-center text-danger">
				There is no note id... Cannot update note...
			</p>
		);

	return (
		<>
			<h1 className="text-center">Update Note</h1>
			{isUpdating ? (
				<Spinner />
			) : (
				<NoteForm
					noteKey={noteId}
					onSubmit={handleSubmit}
					onCancel={handleCancel}
				/>
			)}
		</>
	);
}

export default function UpdateNotePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	return (
		<PrivateRoute>
			<UpdateNote params={params} />
		</PrivateRoute>
	);
}
