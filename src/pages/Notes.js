import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
// contexts:
import { useTheme } from "../contexts/useTheme";
// custom components:
import NoteCard from "../components/NoteCard";
import Tag from "../components/Tag";
import TagWithTrashIcon from "../components/TagWithTrashIcon";
// react bootstrap components:
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import sortNotes from "../helper-functions/sortNotes";

export default function Notes() {
	const { theme } = useTheme();
	const [searchParams, setSearchParams] = useSearchParams();
	const TAGS = useSelector((state) => state.tags.value);
	const NOTES = useSelector((state) => state.notes.value);

	/**
	 * options: lastUpdated (default), firstUpdated, lastCreated, firstCreated
	 */
	//const [sortBy, setSortBy] = useState("lastUpdated");
	const sortBy = searchParams.get("sortBy") || "lastUpdated"
	const tags = searchParams.get("tags");

	const areNotesPending = useSelector((state) => state.notes.pending);

	const NOTES_ARRAY = Object.keys(NOTES).map(id => ({
		...NOTES[id],
		id
	}))

	const sortedNotes = sortNotes(NOTES_ARRAY, sortBy); // ⚠️ note object consists noteId

	const filteredNotes = searchParams.get("tags")
		? sortedNotes
			.filter((note) =>
				searchParams
					.get("tags")
					.split("+")
					.every((element) =>
						Object.keys(note.tags).includes(element)
					)
			)
		: sortedNotes

	const [input, setInput] = useState("");
	const [foundTags, setFoundTags] = useState({});

	useEffect(() => window.scrollTo({ top: 0, behavior: "instant" }), []);

	if (areNotesPending)
		return (
			<h1 className="text-center mb-3">
				Your notes are pending...{" "}
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</h1>
		);

	return (
		<>
			<h1 className="text-center mb-3">
				Your filtered notes ({filteredNotes.length})
			</h1>
			{/*================== search bar ==================*/}
			<div className="search-bar">
				<Form.Label>Filter your notes by tags:</Form.Label>
				<input
					type="text"
					className={
						"form-control mb-2 + bg-" +
						theme +
						" text-" +
						(theme === "dark" ? "light" : "dark")
					}
					value={input}
					placeholder="type some tag to filter your notes & click found tag"
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
								const prevParamsString = searchParams.get("tags"); // abc+cds || abc || null
								setSearchParams({
									tags: prevParamsString ? prevParamsString + "+" + id : id,
									sortBy
								});
								// clear found tags:
								setFoundTags({});
								// clear input:
								setInput("");
							}}
						/>
					))}
				</div>

				{/*======================================== filter tags */}
				{searchParams.get("tags") ? (
					<div className="filter-tags">
						{searchParams
							.get("tags")
							.split("+")
							.map((filterTagId) => (
								<TagWithTrashIcon
									key={filterTagId}
									tag={TAGS[filterTagId]}
									onClick={() => {
										const updatedParamsString = searchParams
											.get("tags")
											.split("+")
											.filter((id) => filterTagId !== id)
											.join("+");
										if (updatedParamsString) {
											setSearchParams({
												tags: updatedParamsString,
												sortBy
											});
										} else {
											setSearchParams({sortBy});
										}
									}}
								/>
							))}
					</div>
				) : (
					<div className="filter-tags mb-2">There are no filter tags...</div>
				)}
			</div>

			<div className="sort">
				<select
					className={
						"form-control mb-2 + bg-" +
						theme +
						" text-" +
						(theme === "dark" ? "light" : "dark")
					}
					onChange={e => {
						setSearchParams({
							tags,
							sortBy: e.target.value,
						})
					}}
					value={sortBy}
				>
					<option value="lastUpdated">last updated</option>
					<option value="firstUpdated">first updated</option>
					<option value="lastCreated">last created</option>
					<option value="firstCreated">first created</option>
				</select>
			</div>

			<div className="filtered-notes">
				{filteredNotes.map((note) => (
					<NoteCard
						key={note.id}
						note={note}
						noteKey={note.id}
						show140chars={true}
					/>
				))}
			</div>
		</>
	);
}
