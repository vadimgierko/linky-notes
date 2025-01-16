"use client";

import NoteForm, { NoteObjectForUpdate } from "@/components/NoteForm";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function AddNote() {
	const router = useRouter();

	function handleSubmit(
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

		// const newKey = "" // TODO: 🚀❗ generateFirebaseKeyFor("items/" + user.id);
		console.log("New note was added:", note);
		// implement adding note
		// => navigate("/notes/" + newKey, { replace: true });
	}

	function handleCancel() {
		return router.back();
	}

	return (
		<>
			<h1 className="text-center">Add New Note</h1>
			<NoteForm onSubmit={handleSubmit} onCancel={handleCancel} />
		</>
	);
}
