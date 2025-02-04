"use client";
import NoteCard from "@/components/NoteCard";
import PrivateRoute from "@/components/PrivateRoute";
import Tag from "@/components/Tag";
import TagWithTrashIcon from "@/components/TagWithTrashIcon";
import useNotes from "@/context/useNotes";
import useTags from "@/context/useTags";
import sortNotes from "@/lib/sortNotes";
import { Tag as ITag, Note, Tags } from "@/types";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useRef, useState } from "react";
import { Form, Spinner } from "react-bootstrap";

export default function NotesPageWrappedInSuspense() {
	return (
		<Suspense
			fallback={
				<h1 className="text-center">
					Your Notes Are Pending...{" "}
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</h1>
			}
		>
			<NotesPage />
		</Suspense>
	);
}

function NotesPage() {
	const router = useRouter();

	const searchParams = useSearchParams();

	const { notes, notesNum, isFetching: areNotesFetching } = useNotes();
	const { tags, isFetching: areTagsFetching, getTagNotesNum } = useTags();

	// for tags search form:
	const [input, setInput] = useState<string>("");
	const [foundTags, setFoundTags] = useState<Tags>({});

	//======================== searchTags => filteredNotes ========================//
	/**
	 * options: lastUpdated (default), firstUpdated, lastCreated, firstCreated
	 */
	const sortBy = searchParams.get("sortBy") || "lastUpdated";

	const searchTagsIdsString = searchParams.get("tags");
	// split tags search string into an array of tagsIds:
	const searchTagsIds = searchTagsIdsString
		? searchTagsIdsString.split(" ") // "+"
		: []
	// console.log(searchTagsIds)
	const searchTags = searchTagsIds.reduce((filterTags, tagId) => tags ? ([...filterTags, tags[tagId]]) : [], [] as ITag[])
	// console.log("searchTags:", searchTags)

	function filterNotesIds() {
		let filteredNotesIds: string[] = [];

		searchTags.forEach(tag => {
			// if any of tags has got no notes, reset filteredNotesIds & break the loop:
			if (!tag || !tag.notes) {
				filteredNotesIds = [];
				return;
			}

			// if tag has got notes ids & filteredNotesIds are empty, push ids:
			if (!filteredNotesIds.length) {
				filteredNotesIds.push(...Object.keys(tag.notes))
			}

			if (searchTags.length > 1) {
				// now with the every next tag keep only notes id that are common:
				const mutualNoteIds = Object.keys(tag.notes).filter(id => filteredNotesIds.includes(id))
				filteredNotesIds = mutualNoteIds
			}
		})

		return filteredNotesIds
	}

	const filteredNotesIds = filterNotesIds()
	// console.log("filteredNotesIds:", filteredNotesIds)
	const filteredNotes: Note[] = notes ? filteredNotesIds.map(noteId => notes[noteId]) : []
	// console.log("filteredNotes:", filteredNotes)

	const filteredAndSortedNotes = sortNotes(
		filteredNotes,
		sortBy as "lastUpdated" | "firstUpdated" | "lastCreated" | "firstCreated"
	); // ⚠️ note object consists noteId

	const debouncedSetFoundTags = useRef<NodeJS.Timeout | null>(null);

	return (
		<PrivateRoute>
			<header>
				<h1 className="text-center">
					Filtered Notes ({filteredAndSortedNotes.length}/{notesNum})
				</h1>
			</header>

			{/*================== search bar ==================*/}
			<div className="search-bar">
				<Form.Label>Filter your notes by tags:</Form.Label>
				<Form.Control
					className="form-control mb-2"
					value={input}
					placeholder="type some tag to filter your notes & click found tag"
					onChange={(e) => {
						const changedInput = e.target.value;
						setInput(changedInput);

						// clear prev debounce timer:
						if (debouncedSetFoundTags.current) {
							clearTimeout(debouncedSetFoundTags.current)
						}

						// reassign debounce timer:
						debouncedSetFoundTags.current = setTimeout(() => {
							// console.log("debouncing")
							//=============================================
							// when user types, set found tags to show them:
							if (changedInput && changedInput.length) {
								if (tags && Object.keys(tags).length) {
									const foundTags: ITag[] = Object.values(tags).filter((tag) =>
										tag.tag.startsWith(changedInput)
									);

									setFoundTags(foundTags.reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {} as Tags))
								}
							} else {
								// if input is cleared:
								setFoundTags({});
							}
						}, 500)
					}}
				/>

				{/*======================================== found tags */}
				<div className="found-tags">
					{Object.keys(foundTags).map((id) => (
						<Link
							href={`?tags=${searchTagsIdsString ? searchTagsIdsString + "+" + id : id
								}&sortBy=${sortBy}`}
							key={id}
						>
							<Tag
								value={`${tags![id].tag} (${getTagNotesNum(id)})`} // 🚀❗ fix using !
								onClick={() => {
									// clear found tags:
									setFoundTags({});
									// clear input:
									setInput("");
								}}
							/>
						</Link>
					))}
				</div>

				{/*======================================== filter tags */}
				{searchTagsIdsString && tags ? (
					<div className="filter-tags">
						{searchTagsIdsString
							.split(" ") // "+"
							.map((filterTagId) => {
								const updatedParamsString = searchTagsIdsString
									.split(" ") // "+"
									.filter((id) => filterTagId !== id)
									.join("+");

								const filterTagLink = updatedParamsString
									? `?tags=${updatedParamsString}&sortBy=${sortBy}`
									: `?sortBy=${sortBy}`;

								return (
									<Link href={filterTagLink} key={filterTagId}>
										<TagWithTrashIcon tag={tags[filterTagId]} />
									</Link>
								);
							})}
					</div>
				) : (
					<div className="filter-tags mb-2">There are no filter tags...</div>
				)}
			</div>

			{/** SORT */}
			<div className="sort">
				<select
					className="form-control mb-2"
					onChange={(e) =>
						searchTagsIdsString
							? router.push(`?tags=${searchTagsIdsString}&sortBy=${e.target.value}`)
							: router.push(`?sortBy=${e.target.value}`)
					}
					value={sortBy}
				>
					<option value="lastUpdated">last updated</option>
					<option value="firstUpdated">first updated</option>
					<option value="lastCreated">last created</option>
					<option value="firstCreated">first created</option>
				</select>
			</div>

			{areNotesFetching && (
				<div className="text-center">
					Loading your notes...{" "}
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			)}

			<div
				id="filtered-notes"
			>
				{
					areTagsFetching
						? <div className="text-center">
							Loading your tags...{" "}
							<Spinner animation="border" role="status">
								<span className="visually-hidden">Loading...</span>
							</Spinner>
						</div>
						: filteredAndSortedNotes.map((note) => (
							<NoteCard
								key={note.id}
								note={note}
								noteKey={note.id}
								show140chars={true}
							/>
						))
				}
			</div>
		</PrivateRoute>
	);
}
