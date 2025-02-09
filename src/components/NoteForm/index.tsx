import { FormEvent, useEffect, useState } from "react";
// react-bootstrap components:
import { Form, Button } from "react-bootstrap";
// custom components:
import Tag from "../Tag";
import TagWithTrashIcon from "../TagWithTrashIcon";
import MarkdownRenderer from "../MarkdownRenderer";
import useNotes from "@/context/useNotes";
import { Tag as ITag, NoteObjectForUpdate, Tags } from "@/types";
import useTags from "@/context/useTags";

interface NoteFormProps {
	noteKey?: string;
	onSubmit: (e: FormEvent<HTMLFormElement>, note: NoteObjectForUpdate) => void;
	onCancel: () => void;
}

export default function NoteForm({
	noteKey,
	onSubmit,
	onCancel,
}: NoteFormProps) {
	// from state:
	const { getNoteById } = useNotes();
	const { tags: TAGS, getTagNotesNum, getTagById } = useTags();
	// note object:
	const [note, setNote] = useState<NoteObjectForUpdate | null>(null);
	// tag search bar:
	const [input, setInput] = useState("");
	const [foundTags, setFoundTags] = useState<Tags>({}); // tags which exist in database
	const [newTag, setNewTag] = useState(""); // new tag added by user
	// editor mode: (edit, preview)
	const [editorMode, setEditorMode] = useState<"edit" | "preview">("edit");

	useEffect(() => {
		if (noteKey) {
			// if noteKey was passed,
			// it means that we are updating the existing note,
			// so we need to fetch it from the store:
			const noteToUpdate = getNoteById(noteKey);

			if (!noteToUpdate) return;

			const noteObjectForUpdate: NoteObjectForUpdate = {
				...noteToUpdate,
				existingTags: {
					...Object.keys(noteToUpdate.tags).reduce(
						(prev, curr) => ({ ...prev, [curr]: true }),
						{}
					),
				},
				newTags: [],
				removedExistingTags: [],
				addedExistingTags: [],
			};

			setNote(noteObjectForUpdate);
		} else {
			const emptyNote: NoteObjectForUpdate = {
				existingTags: {},
				newTags: [],
				content: "",
				createdAt: "",
				id: "",
				updatedAt: "",
				userId: "",
				removedExistingTags: [],
				addedExistingTags: [],
			};

			setNote(emptyNote);
		}
	}, [getNoteById, noteKey]);

	if (!note) return null;

	return (
		<Form
			onSubmit={(e) => {
				// before submit,
				// check removed & newly added existing tags only in updated notes
				// by comparing prevNote tags & updatedNote existingTags:
				const checkedForTagsToRemoveAndNewlyAddedNote: NoteObjectForUpdate = {
					...note,
				};

				if (noteKey) {
					const prevNote = getNoteById(noteKey);

					if (!prevNote)
						return alert(
							"There is no prevNote to updated... Cannot update note..."
						);

					// check for & push removed tags:
					Object.keys(prevNote.tags).forEach((prevTagId) => {
						if (
							!checkedForTagsToRemoveAndNewlyAddedNote.existingTags[prevTagId]
						) {
							checkedForTagsToRemoveAndNewlyAddedNote.removedExistingTags.push(
								prevTagId
							);
						}
					});

					// check for & push newly added tags:
					Object.keys(
						checkedForTagsToRemoveAndNewlyAddedNote.existingTags
					).forEach((currTagId) => {
						if (!prevNote.tags[currTagId]) {
							checkedForTagsToRemoveAndNewlyAddedNote.addedExistingTags.push(
								currTagId
							);
						}
					});
				} else {
					// if this is newly added note
					// all the existingTags should be pushed to addedExistingTags
					// to add new noteId to them 😉
					Object.keys(
						checkedForTagsToRemoveAndNewlyAddedNote.existingTags
					).forEach((currTagId) => {
						checkedForTagsToRemoveAndNewlyAddedNote.addedExistingTags.push(
							currTagId
						);
					});
				}

				onSubmit(e, checkedForTagsToRemoveAndNewlyAddedNote);
			}}
		>
			<Form.Group className="mb-3">
				{editorMode === "edit" && (
					<Form.Control
						as="textarea"
						//rows={11}
						placeholder="type your note here"
						value={note.content || ""}
						style={{
							height: "40vh",
						}}
						onChange={(e) => setNote({ ...note, content: e.target.value })}
					/>
				)}
				{editorMode === "preview" && (
					<div className="border py-2 px-3">
						<MarkdownRenderer markdown={note.content} />
					</div>
				)}
			</Form.Group>
			<Form.Check
				className="mb-3"
				type="checkbox"
				label="preview"
				checked={editorMode === "preview"}
				onChange={() =>
					setEditorMode(editorMode === "edit" ? "preview" : "edit")
				}
			/>

			{/*================== search bar ==================*/}
			<Form.Group className="search-bar mb-3">
				<Form.Control
					className="mb-2"
					value={input}
					placeholder="find tag/s to add or create a new one"
					onChange={(e) => {
						const changedInput = e.target.value;
						setInput(changedInput);
						//=============================================
						// when user types, set found tags to show them:
						if (changedInput && changedInput.length) {
							// if there are some tags stored in database =>
							// find tags or create a new one
							if (TAGS && Object.keys(TAGS).length) {
								const foundTagsId = Object.keys(TAGS).filter((id) =>
									TAGS[id].tag
										.toLowerCase()
										.startsWith(changedInput.toLowerCase())
								);
								// if there is at least one existing tag found:
								if (foundTagsId.length) {
									let updatedFoundTags: { [key: string]: ITag } = {};
									foundTagsId.forEach(
										(id) =>
											(updatedFoundTags = {
												...updatedFoundTags,
												[id]: TAGS[id],
											})
									);
									setFoundTags(updatedFoundTags);
									// set new tag if there is no exact match with any of found tags or existing & new:
									const isExactMatch =
										Object.keys(updatedFoundTags).find(
											(tagId) => updatedFoundTags[tagId].tag === changedInput
										) ||
										(Object.keys(note.existingTags).length
											? Object.keys(note.existingTags).find((tagId) => {
													const tag = getTagById(tagId);

													if (!tag) return undefined;

													return tag.tag === changedInput;
											  })
											: false) ||
										(note.newTags.length
											? note.newTags.find((tag) => tag === changedInput)
											: false)
											? true
											: false;
									if (isExactMatch) {
										setNewTag("");
									} else {
										setNewTag(changedInput);
									}
								} else {
									// if there are no such tag
									// enable to create and add new one:
									setNewTag(changedInput);
									setFoundTags({});
								}
							} else {
								// if there are no tags stored in database =>
								// create a new tag:
								setNewTag(changedInput);
							}
						} else {
							// if input is cleared:
							setFoundTags({});
							setNewTag("");
						}
					}}
				/>

				{/*======================================== found tags */}
				{Object.keys(foundTags).length ? (
					<div className="found-tags">
						{Object.keys(foundTags).map((id) => (
							<Tag
								key={id}
								value={TAGS![id].tag + ` (${getTagNotesNum(id)})`}
								onClick={() => {
									// add tag to note.existingTags:
									setNote({
										...note,
										existingTags: { ...note.existingTags, [id]: true },
									});
									// clear found tags:
									setFoundTags({});
									// clear input:
									setInput("");
									// clear new tag:
									setNewTag("");
								}}
							/>
						))}
					</div>
				) : null}

				{/*======================================== new tag */}
				{newTag && (
					<div className="new-tag">
						<span>add new tag to database: </span>
						<Tag
							key={newTag}
							value={newTag}
							onClick={() => {
								// add new tag to note.newTags:
								setNote({ ...note, newTags: [...note.newTags, newTag] });
								// clear found tags:
								setNewTag("");
								// clear input:
								setInput("");
								// clear found tags:
								setFoundTags({});
							}}
						/>
					</div>
				)}

				{/*================================== filter tags (existing & new) */}
				{Object.keys(note.existingTags).length || note.newTags.length ? (
					<div className="filter-tags">
						{Object.keys(note.existingTags).map((id) => (
							<TagWithTrashIcon
								key={id}
								tag={TAGS![id]}
								onClick={() => {
									// delete tag from note.existingTags:
									const updatedTags = { ...note.existingTags };
									delete updatedTags[id];
									setNote({ ...note, existingTags: updatedTags });
								}}
							/>
						))}
						{note.newTags.map((tag) => (
							<TagWithTrashIcon
								key={tag}
								//❗❗❗ below I'm passing "pseudo" tag, only containing value❗❗❗
								tag={{
									tag: tag,
									id: "",
									createdAt: "",
									updatedAt: "",
									userId: "",
								}}
								onClick={() => {
									// delete tag from note.newTags
									const updatedTags = note.newTags.filter((t) => t !== tag);
									setNote({ ...note, newTags: updatedTags });
								}}
							/>
						))}
					</div>
				) : (
					<div className="filter-tags">This note has no tags yet...</div>
				)}
			</Form.Group>

			<Form.Group className="text-end">
				<Button
					className="me-2"
					variant="secondary"
					onClick={() => {
						const emptyNote: NoteObjectForUpdate = {
							existingTags: {},
							newTags: [],
							removedExistingTags: [],
							addedExistingTags: [],
							content: "",
							createdAt: "",
							id: "",
							updatedAt: "",
							userId: "",
						};

						setNote(emptyNote);
						onCancel();
					}}
				>
					Cancel
				</Button>
				<Button variant="success" type="submit">
					{noteKey ? "Update note" : "Add note"}
				</Button>
			</Form.Group>
		</Form>
	);
}
