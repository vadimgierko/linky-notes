import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "../../contexts/useTheme";
// react-bootstrap components:
import { Form, Button } from "react-bootstrap";
// custom components:
import Tag from "../Tag";
import TagWithTrashIcon from "../TagWithTrashIcon";

export default function NoteForm({ noteKey, onSubmit = (f) => f }) {
	const { theme } = useTheme();
	const NOTES = useSelector((state) => state.notes.value);
	const TAGS = useSelector((state) => state.tags.value);
	const [note, setNote] = useState();
	// tag search bar:
	const [input, setInput] = useState("");
	const [foundTags, setFoundTags] = useState({}); // tags which exist in database
	const [newTag, setNewTag] = useState(""); // new tag added by user

	useEffect(() => {
		if (noteKey) {
			if (Object.keys(NOTES).length) {
				// if noteKey was passed,
				// it means that we are updating the existing note,
				// so we need to fetch it from the store:
				const noteObjectForUpdate = {
					...NOTES[noteKey],
					existingTags: { ...(NOTES[noteKey].tags || {}) },
					newTags: [],
				};
				delete noteObjectForUpdate.tags;

				setNote(noteObjectForUpdate);
			}
		} else {
			setNote({
				content: "",
				existingTags: {},
				newTags: [],
			});
		}
	}, [noteKey, NOTES]);

	//============================================ delete this when finish:
	useEffect(() => {
		console.log("note:", note);
	}, [note]);

	useEffect(() => {
		console.log("new tag:", newTag);
	}, [newTag]);
	//====================================================================/

	if (!note) return null;

	return (
		<div
			style={{
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				color: theme === "light" ? "black" : "white",
			}}
		>
			<h3 className="text-center mb-3">
				{noteKey ? "Update Note!" : "Add Note!"}
			</h3>
			<Form
				className="border border-secondary rounded p-3 shadow"
				onSubmit={(e) => onSubmit(e, note)}
			>
				<Form.Group className="mb-3">
					<Form.Label>Note content:</Form.Label>
					<Form.Control
						as="textarea"
						rows={5}
						placeholder="type your note here"
						value={note ? note.content : ""}
						style={{
							backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
							color: theme === "light" ? "black" : "white",
						}}
						onChange={(e) => setNote({ ...note, content: e.target.value })}
					/>
				</Form.Group>

				{/*================== search bar ==================*/}
				<div className="search-bar">
					<input
						type="text"
						className={
							"form-control mb-2 + bg-" +
							theme +
							" text-" +
							(theme === "dark" ? "light" : "dark")
						}
						value={input}
						placeholder="type some tag to find tags or create a new one for your note"
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
										TAGS[id].tag.startsWith(changedInput)
									);
									// if there is at least one existing tag found:
									if (foundTagsId.length) {
										let updatedFoundTags = {};
										foundTagsId.forEach(
											(id) =>
												(updatedFoundTags = {
													...updatedFoundTags,
													[id]: TAGS[id],
												})
										);
										setFoundTags(updatedFoundTags);
										setNewTag("");
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
									value={TAGS[id].tag}
									onClick={() => {
										// add tag to note.existingTags:
										setNote({
											...note,
											existingTags: { ...note.existingTags, [id]: TAGS[id] },
										});
										// clear found tags:
										setFoundTags({});
										// clear input:
										setInput("");
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
									tag={TAGS[id]}
									onClick={() => {
										// delete tag from note.existingTags:
										let updatedTags = { ...note.existingTags };
										delete updatedTags[id];
										setNote({ ...note, existingTags: updatedTags });
									}}
								/>
							))}
							{note.newTags.map((tag) => (
								<TagWithTrashIcon
									key={tag}
									tag={{ tag: tag }}
									onClick={() => {
										// delete tag from note.newTags
										let updatedTags = note.newTags.filter((t) => t !== tag);
										setNote({ ...note, newTags: updatedTags });
									}}
								/>
							))}
						</div>
					) : (
						<div className="filter-tags">This note has no tags yet...</div>
					)}
				</div>

				<div className="d-grid my-2">
					<Button variant="success" type="submit">
						{noteKey ? "Update note" : "Add note"}
					</Button>
				</div>
			</Form>
		</div>
	);
}
