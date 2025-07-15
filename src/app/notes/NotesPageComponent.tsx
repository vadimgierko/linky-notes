"use client";
import NoteCard from "@/components/NoteCard";
import PrivateRoute from "@/components/PrivateRoute";
import TagsSearchBar from "@/components/TagsSearchBar";
import useNotes from "@/context/useNotes";
import useTags from "@/context/useTags";
import sortNotes from "@/lib/sortNotes";
import { SortBy, Tag as ITag, Note } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function NotesPageComponent() {
	const router = useRouter();

	const searchParams = useSearchParams();

	const {
		notes,
		notesNum,
		getNoteById,
		fetchAndListenToNotes: fetchNotes,
	} = useNotes();

	const { tags } = useTags();

	const fetchAndListenToNotes = useCallback(
		(ids: string[]) => fetchNotes(ids),
		[fetchNotes]
	);

	//======================== searchTags => filteredNotes ========================//
	/**
	 * options: lastUpdated (default), firstUpdated, lastCreated, firstCreated
	 */
	const sortBy = searchParams.get("sortBy")
		? (searchParams.get("sortBy") as SortBy)
		: "lastUpdated";

	const searchTagsIdsString = searchParams.get("tags");
	// split tags search string into an array of tagsIds:
	const searchTagsIds = searchTagsIdsString
		? searchTagsIdsString.split(" ") // "+"
		: [];
	// console.log(searchTagsIds)
	const searchTags = searchTagsIds.reduce(
		(filterTags, tagId) => (tags ? [...filterTags, tags[tagId]] : []),
		[] as ITag[]
	);
	// console.log("searchTags:", searchTags)

	function filterNotesIds() {
		let filteredNotesIds: string[] = [];

		searchTags.forEach((tag) => {
			// if any of tags has got no notes, reset filteredNotesIds & break the loop:
			if (!tag || !tag.notes) {
				filteredNotesIds = [];
				return;
			}

			// if tag has got notes ids & filteredNotesIds are empty, push ids:
			if (!filteredNotesIds.length) {
				filteredNotesIds.push(...Object.keys(tag.notes));
			}

			if (searchTags.length > 1) {
				// now with the every next tag keep only notes id that are common:
				const mutualNoteIds = Object.keys(tag.notes).filter((id) =>
					filteredNotesIds.includes(id)
				);
				filteredNotesIds = mutualNoteIds;
			}
		});

		return filteredNotesIds;
	}

	const filteredNotesIds = filterNotesIds();

	const filteredNotesIdsToFetch = filteredNotesIds.filter(
		(id) => !getNoteById(id)
	);
	//==========================================================================================//
	// console.log("filteredNotesIds:", filteredNotesIds)
	const filteredNotes: Note[] = notes
		? (filteredNotesIds
				.map((noteId) => getNoteById(noteId))
				.filter((note) => note) as Note[])
		: [];
	// console.log("filteredNotes:", filteredNotes)

	const filteredAndSortedNotes = sortNotes(
		filteredNotes,
		sortBy as "lastUpdated" | "firstUpdated" | "lastCreated" | "firstCreated"
	); // ⚠️ note object consists noteId

	useEffect(() => {
		if (filteredNotesIdsToFetch.length) {
			fetchAndListenToNotes(filteredNotesIdsToFetch);
		}
	}, [fetchAndListenToNotes, filteredNotesIdsToFetch]);

	// THIS COMMENTED CODE BELOW
	// SHOULD BE USED ONLY TO FETCH ALL USER'S NOTES.

	// useEffect(() => {
	// 	async function fetchAllNotes() {
	// 		if (!user) return;

	// 		const NOTES_REF = generateItemsRef("notes", user.uid);
	// 		const notesSnap = await get(ref(rtdb, NOTES_REF));

	// 		if (notesSnap.exists()) {
	// 			const data = notesSnap.val();
	// 			console.log("Notes:", data);
	// 		}
	// 	}

	// 	fetchAllNotes();
	// }, [user]);

	// useEffect(() => {
	// 	console.log("doesEveryTagNoteExist:", doesEveryTagNoteExist);
	// 	console.log("tagsWithNonExistentNotes:", tagsWithNonExistentNotes);
	// }, []);

	return (
		<PrivateRoute>
			<header>
				<h1 className="text-center">
					Filtered Notes ({filteredAndSortedNotes.length}/
					{notesNum ? notesNum : 0})
				</h1>
			</header>

			{/*================== search bar ==================*/}
			<TagsSearchBar.InputAndFoundTags
				useLinks={true}
				searchTagsIdsString={searchTagsIdsString || ""}
				sortBy={sortBy}
			/>

			{searchTagsIdsString && tags ? (
				<TagsSearchBar.SelectedTagsLinks
					selectedTags={searchTagsIdsString
						.split(" ") // "+"
						.map((filterTagId) => {
							const updatedParamsString = searchTagsIdsString
								.split(" ") // "+"
								.filter((id) => filterTagId !== id)
								.join("+");

							const filterTagLink = updatedParamsString
								? `?tags=${updatedParamsString}&sortBy=${sortBy}`
								: `?sortBy=${sortBy}`;

							const t = { tag: tags[filterTagId], tagLink: filterTagLink };
							return t;
						})}
				/>
			) : (
				<div className="filter-tags mb-2">There are no filter tags...</div>
			)}

			{/** SORT */}
			<div className="sort">
				<select
					className="form-control mb-2"
					onChange={(e) =>
						searchTagsIdsString
							? router.push(
									`?tags=${searchTagsIdsString}&sortBy=${e.target.value}`
							  )
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

			<div id="filtered-notes">
				{filteredAndSortedNotes.map((note) => (
					<NoteCard
						key={note.id}
						note={note}
						noteKey={note.id}
						show140chars={true}
					/>
				))}
			</div>
		</PrivateRoute>
	);
}
