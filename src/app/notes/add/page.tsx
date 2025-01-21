"use client";

import NoteForm, { NoteObjectForUpdate } from "@/components/NoteForm";
import PrivateRoute from "@/components/PrivateRoute";
import useNotes from "@/context/useNotes";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Spinner } from "react-bootstrap";

export default function AddNotePage() {
	return (
		<PrivateRoute>
			<AddNote />
		</PrivateRoute>
	);
}

function AddNote() {
	const router = useRouter();
	const { addNote, getNoteById } = useNotes();
	const [isAdding, setIsAdding] = useState(false);

	async function handleSubmit(
		e: FormEvent<HTMLFormElement>,
		note: NoteObjectForUpdate
	) {
		e.preventDefault();
		console.log("Note to add:", note);

		if (!note.content.length)
			return alert(
				"Your note is empty! Add some content to your note to add it to database."
			);

		if (!Object.keys(note.existingTags).length && !note.newTags.length)
			return alert(
				"Your note has no tags! Add at least 1 tag to add it to database."
			);

		setIsAdding(true);

		const newNoteId = await addNote(note);

		if (!newNoteId) {
			setIsAdding(false);
			return console.error("No newNoteId provided... Cannot add note...");
		}

		const newNote = getNoteById(newNoteId);
		console.log("New note was added:", newNote);

		// navigate to new note:
		router.push("/notes/" + newNoteId);
	}

	function handleCancel() {
		return router.back();
	}

	return (
		<>
			<h1 className="text-center">Add New Note</h1>
			{
				isAdding
					? <Spinner />
					: <NoteForm onSubmit={handleSubmit} onCancel={handleCancel} />
			}
		</>
	);
}
