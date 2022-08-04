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
	const [note, setNote] = useState({
		content: "",
		tags: {},
	});
	// tag search bar:
	const [input, setInput] = useState("");
	const [foundTags, setFoundTags] = useState({});

	useEffect(() => {
		if (noteKey) {
			// if noteKEy was passed,
			// it means that we are updating the existing note,
			// so we need to fetch it from the store:
			setNote(NOTES[noteKey]);
		}
	}, [noteKey]);

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
						value={note.content || ""}
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
						placeholder="type some tag to find tags for your note"
						onChange={(e) => {
							const changedInput = e.target.value;
							setInput(changedInput);
							//=============================================
							// when user types, set found tags to show them:
							if (changedInput && changedInput.length) {
								if (TAGS && Object.keys(TAGS).length) {
									const foundTagsId = Object.keys(TAGS).filter((id) =>
										TAGS[id].tag.startsWith(changedInput)
									);
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
									}
								}
							} else {
								// if input is cleared:
								setFoundTags({});
							}
						}}
					/>

					{/*======================================== found tags */}
					<div className="found-tags">
						{Object.keys(foundTags).map((id) => (
							<Tag
								key={id}
								value={TAGS[id].tag}
								onClick={() => {
									// add tag to note.tags:
									setNote({ ...note, tags: { ...note.tags, [id]: TAGS[id] } });
									// clear found tags:
									setFoundTags({});
									// clear input:
									setInput("");
								}}
							/>
						))}
					</div>

					{/*======================================== filter tags */}
					{Object.keys(note.tags).length ? (
						<div className="filter-tags">
							{Object.keys(note.tags).map((id) => (
								<TagWithTrashIcon
									key={id}
									tag={TAGS[id]}
									onClick={() => {
										// TODO: delete tag from note.tags
										let updatedTags = { ...note.tags };
										delete updatedTags[id];
										setNote({ ...note, tags: updatedTags });
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
