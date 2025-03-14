import { FormEvent, useEffect, useState } from "react";
// react-bootstrap components:
import { Form, Button, Spinner } from "react-bootstrap";
// custom components:
import Tag from "../Tag";
import TagWithTrashIcon from "../TagWithTrashIcon";
import MarkdownRenderer from "../MarkdownRenderer";
import useNotes from "@/context/useNotes";
import { Tag as ITag, NoteObjectForUpdate, Tags } from "@/types";
import useTags from "@/context/useTags";
import sortTagsAlphabetically from "@/lib/sortTagsAlphabetically";
import { fetchNote } from "@/lib/crud/notes";
import useUser from "@/context/useUser";

interface NoteFormProps {
	noteKey?: string;
	onSubmit: (e: FormEvent<HTMLFormElement>, note: NoteObjectForUpdate) => void;
	onCancel: () => void;
}

const emptyNote: NoteObjectForUpdate = {
	existingTags: {},
	newTags: [],
	removedExistingTags: [],
	addedExistingTags: [],
	createdAt: { auto: 0 },
	id: "",
	updatedAt: 0,
	userId: "",
	children: { [0]: { type: "content", value: "" } },
};

export default function NoteForm({
	noteKey,
	onSubmit,
	onCancel,
}: NoteFormProps) {
	// from state:
	const { user } = useUser();
	const { getNoteById, fetchAndListenToNote } = useNotes();
	const { tags: TAGS, getTagNotesNum, getTagById } = useTags();
	const [isLoading, setIsLoading] = useState(true);
	// note object:
	const [note, setNote] = useState<NoteObjectForUpdate | null>(null);
	// tag search bar:
	const [input, setInput] = useState("");
	const [foundTags, setFoundTags] = useState<Tags>({}); // tags which exist in database
	const foundTagsSortedAlphabetically = sortTagsAlphabetically(foundTags);
	const [error, setError] = useState<unknown | undefined>(undefined);

	// sort note existing tags alphabetically:
	const noteExistingTags: ITag[] = Object.keys({
		...note?.existingTags,
	})
		.map((tagId) => getTagById(tagId))
		.filter((t) => t !== null) as ITag[];
	const noteExistingTagsObject = noteExistingTags.reduce(
		(tagsObject, tag) => ({ ...tagsObject, [tag.id]: tag }),
		{} as Tags
	);
	const noteExistingTagsSortedAlphabetically = sortTagsAlphabetically(
		noteExistingTagsObject
	);

	const [newTag, setNewTag] = useState(""); // new tag added by user
	// editor mode: (edit, preview)
	const [editorMode, setEditorMode] = useState<"edit" | "preview">("edit");

	useEffect(() => {
		if (!user) return;
		if (!isLoading) return;
		if (!noteKey) {
			setNote(emptyNote);
			setIsLoading(false);
		}

		// if noteKey was passed,
		// it means that we are updating the existing note,
		// so we need to fetch it from the store:
		const noteToUpdate = getNoteById(noteKey!);

		if (noteToUpdate) {
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
			setIsLoading(false);
		} else {
			fetchNote({ noteId: noteKey, user: user })
				.then(returnObj => {
					const { note: n, error } = returnObj;

					setError(error);

					if (n) {
						const noteObjectForUpdate: NoteObjectForUpdate = {
							...n,
							existingTags: {
								...Object.keys(n.tags).reduce(
									(prev, curr) => ({ ...prev, [curr]: true }),
									{}
								),
							},
							newTags: [],
							removedExistingTags: [],
							addedExistingTags: [],
						};
						setNote(noteObjectForUpdate);
						// this code below sets listener & updates notes store:
						fetchAndListenToNote(n.id);
					}

					setIsLoading(false);
				})
		}
	}, [getNoteById, noteKey, fetchAndListenToNote, isLoading, user]);

	// if update mode:
	if (noteKey) {
		if (isLoading) return <Spinner />;
		if (error) return <p>Error while fetching a note... See console logs for futher information...</p>
		if (!note) return <p>There is no such note...</p>;
	}

	if (!note) return <p>There is no such note...</p>;

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
						value={note.children[0].value || ""}
						style={{
							height: "40vh",
						}}
						onChange={(e) =>
							setNote({
								...note,
								children: {
									...note.children,
									0: { type: "content", value: e.target.value },
								},
							})
						}
					/>
				)}
				{editorMode === "preview" && (
					<div className="border py-2 px-3">
						<MarkdownRenderer
							markdown={note.children[0].value}
						/>
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
									TAGS[id].value
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
											(tagId) => updatedFoundTags[tagId].value === changedInput
										) ||
											(Object.keys(note.existingTags).length
												? Object.keys(note.existingTags).find((tagId) => {
													const tag = getTagById(tagId);

													if (!tag) return undefined;

													return tag.value === changedInput;
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
				{foundTagsSortedAlphabetically.length ? (
					<div className="found-tags">
						{Object.keys(foundTags).map((id) => (
							<Tag
								key={id}
								value={TAGS![id].value + ` (${getTagNotesNum(id)})`}
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
				{noteExistingTagsSortedAlphabetically.length || note.newTags.length ? (
					<div className="filter-tags">
						{noteExistingTagsSortedAlphabetically.map((tag) => (
							<TagWithTrashIcon
								key={tag.id}
								tag={tag}
								onClick={() => {
									// delete tag from note.existingTags:
									const updatedTags = { ...note.existingTags };
									delete updatedTags[tag.id];
									setNote({ ...note, existingTags: updatedTags });
								}}
							/>
						))}
						<br />
						{note.newTags.length > 0 && (
							<span className="mx-2">new tags to add to database:</span>
						)}
						{note.newTags.toSorted().map((tag) => (
							<TagWithTrashIcon
								key={tag}
								//❗❗❗ below I'm passing "pseudo" tag, only containing value❗❗❗
								tag={{
									value: tag,
									id: "",
									createdAt: { auto: 0 },
									updatedAt: 0,
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
