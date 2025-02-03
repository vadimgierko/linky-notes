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

	const { notes, isFetching: areNotesFetching } = useNotes();
	const { tags, isFetching: areTagsFetching, getTagNotesNum } = useTags();

	// for tags search form:
	const [input, setInput] = useState<string>("");
	const [foundTags, setFoundTags] = useState<Tags>({});

	/**
	 * options: lastUpdated (default), firstUpdated, lastCreated, firstCreated
	 */
	const sortBy = searchParams.get("sortBy") || "lastUpdated";
	const searchTags = searchParams.get("tags");

	const NOTES_ARRAY: Note[] = notes
		? Object.keys(notes).map((id) => ({
			...notes[id],
			id,
		}))
		: [];

	const sortedNotes = sortNotes(
		NOTES_ARRAY,
		sortBy as "lastUpdated" | "firstUpdated" | "lastCreated" | "firstCreated"
	); // ⚠️ note object consists noteId

	const filteredNotes = searchTags
		? sortedNotes.filter((note) =>
			searchTags
				.split(" ") // "+"
				.every((element) => Object.keys(note.tags!).includes(element))
		)
		: sortedNotes;

	const debouncedSetFoundTags = useRef<NodeJS.Timeout | null>(null);

	return (
		<PrivateRoute>
			<h1 className="text-center">
				Your Filtered Notes ({filteredNotes.length})
			</h1>

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
							console.log("debouncing")
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
							href={`?tags=${searchTags ? searchTags + "+" + id : id
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
				{searchTags && tags ? (
					<div className="filter-tags">
						{searchTags
							.split(" ") // "+"
							.map((filterTagId) => {
								const updatedParamsString = searchTags
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
						searchTags
							? router.push(`?tags=${searchTags}&sortBy=${e.target.value}`)
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

			{areTagsFetching && (
				<div className="text-center">
					Loading your tags...{" "}
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			)}

			{filteredNotes.map((note) => (
				<NoteCard
					key={note.id}
					note={note}
					noteKey={note.id}
					show140chars={true}
				/>
			))}
		</PrivateRoute>
	);
}
