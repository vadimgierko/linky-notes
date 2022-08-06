import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// contexts:
import { useTheme } from "../contexts/useTheme";
// custom components:
import NoteCard from "../components/NoteCard";
import Tag from "../components/Tag";
import TagWithTrashIcon from "../components/TagWithTrashIcon";
// react bootstrap components:
import Button from "react-bootstrap/Button";

export default function Notes() {
	const { theme } = useTheme();
	const [searchParams, setSearchParams] = useSearchParams();
	const user = useSelector((state) => state.user.value);
	const TAGS = useSelector((state) => state.tags.value);
	const NOTES = useSelector((state) => state.notes.value);

	const [input, setInput] = useState("");
	const [foundTags, setFoundTags] = useState({});

	const navigate = useNavigate();

	// useEffect(() => {
	// 	console.log("search params:", searchParams.get("tags"));
	// }, [searchParams]);

	if (!user.id)
		return (
			<div
				style={{
					backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
					color: theme === "light" ? "black" : "white",
				}}
				className="items-page"
			>
				<p>You need to be logged to see your items!</p>
			</div>
		);

	return (
		<div
			className="notes-page"
			style={{
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				color: theme === "light" ? "black" : "white",
			}}
		>
			<h1 className="text-center mb-3">
				Your filtered notes (
				{searchParams.get("tags")
					? Object.keys(NOTES).filter((noteId) =>
							searchParams
								.get("tags")
								.split("+")
								.every((element) =>
									Object.keys(NOTES[noteId].tags).includes(element)
								)
					  ).length
					: Object.keys(NOTES).length}
				)
			</h1>
			<div className="d-grid my-2">
				<Button variant="outline-primary" onClick={() => navigate("/add-note")}>
					Add note
				</Button>
			</div>
			{/*================== search bar ==================*/}
			<div className="search-bar">
				<input
					//value={searchParams.get("tag") || ""}
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
											});
										} else {
											setSearchParams({});
										}
									}}
								/>
							))}
					</div>
				) : (
					<div className="filter-tags">There are no filter tags...</div>
				)}

				{/*========================================= filtered notes */}
				{searchParams.get("tags") ? (
					<div className="filtered-notes">
						{/* <p>
							Found notes:{" "}
							{
								Object.keys(NOTES).filter((noteId) =>
									searchParams
										.get("tags")
										.split("+")
										.every((element) =>
											Object.keys(NOTES[noteId].tags).includes(element)
										)
								).length
							}
						</p> */}
						{Object.keys(NOTES)
							.filter((noteId) =>
								searchParams
									.get("tags")
									.split("+")
									.every((element) =>
										Object.keys(NOTES[noteId].tags).includes(element)
									)
							)
							.slice()
							.reverse()
							.map((noteId) => (
								<NoteCard key={noteId} note={NOTES[noteId]} noteKey={noteId} />
							))}
					</div>
				) : (
					<div className="filtered-notes">
						<p>Found notes: {Object.keys(NOTES).length}</p>
						{Object.keys(NOTES)
							.slice()
							.reverse()
							.map((noteId) => (
								<NoteCard key={noteId} note={NOTES[noteId]} noteKey={noteId} />
							))}
					</div>
				)}
			</div>
		</div>
	);
}
