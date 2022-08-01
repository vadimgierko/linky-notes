import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
// contexts:
import { useTheme } from "../../../contexts/useTheme";
// custom components:
import Tag from "./Tag";
import Note from "./Note";

export default function Notes() {
	const { theme } = useTheme();
	const [searchParams, setSearchParams] = useSearchParams();
	const TAGS = useSelector((state) => state.tags.value);
	const NOTES = useSelector((state) => state.notes.value);

	const [input, setInput] = useState("");
	const [foundTags, setFoundTags] = useState({});

	useEffect(() => {
		console.log(searchParams.get("tag"));
	}, [searchParams]);

	return (
		<div className="notes-page" style={{ marginTop: "1em" }}>
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
					placeholder="type some tag to filter your notes & press Enter"
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
						// const filterTag = event.target.value;
						// if (filterTag) {
						//   setSearchParams({ tag: filterTag });
						// } else {
						//   setSearchParams({});
						// }
					}}
				/>
				<br />
				<div className="found-tags">
					Found tags:{" "}
					{Object.keys(foundTags).map((id) => (
						<Tag
							key={id}
							value={TAGS[id].tag}
							onClick={() => {
								setSearchParams({ tag: id });
								//setFilterTags({ [id]: TAGS[id] });
								// clear found tags:
								setFoundTags({});
								// clear input:
								setInput("");
							}}
						/>
					))}
				</div>
				<div className="filter-tags">
					Filter tags:{" "}
					{searchParams.get("tag") && (
						<Tag
							key={searchParams.get("tag")}
							value={TAGS[searchParams.get("tag")].tag}
							onClick={() =>
								console.log(
									"You clicked",
									TAGS[searchParams.get("tag")].tag,
									"filter tag."
								)
							}
						/>
					)}
				</div>
				<hr />
				{/* filtered notes */}
				<div className="filtered-notes">
					{Object.keys(NOTES)
						.filter((noteId) =>
							Object.keys(NOTES[noteId].tags).includes(searchParams.get("tag"))
						)
						.map((noteId) => (
							<Note key={noteId} note={NOTES[noteId]} />
						))}
				</div>
			</div>
		</div>
	);
}

/* {Object.keys(TAGS)
          .filter((tagKey) => {
            let filter = searchParams.get("tag");
            if (!filter) return false; // shows no tags if no input
            let tag = TAGS[tagKey].value.toLowerCase();
            return tag.startsWith(filter.toLowerCase());
          })
          .map((tagKey) => (
            <Tag
              key={TAGS[tagKey].value}
              value={TAGS[tagKey].value}
              onClick={() =>
                console.log("You clicked", TAGS[tagKey].value, "tag.")
              }
            />
          ))} */
