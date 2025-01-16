"use client";
import NoteCard from "@/components/NoteCard";
import TagsSearchBar from "@/components/TagsSearchBar";
import useNotes from "@/context/useNotes";
import useTags from "@/context/useTags";
import useUser from "@/context/useUser";
import sortNotes from "@/lib/sortNotes";
import { NoteWithId} from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { Spinner } from "react-bootstrap";

function HomePage() {
	const router = useRouter();
	const { user } = useUser();

	const searchParams = useSearchParams();

	const { notes } = useNotes();
	const { tags } = useTags();

	/**
	 * options: lastUpdated (default), firstUpdated, lastCreated, firstCreated
	 */
	const sortBy = (searchParams.get("sortBy") || "lastUpdated") as "lastUpdated" | "firstUpdated" | "lastCreated" | "firstCreated"
	const searchTags = searchParams.get("tags");

	const NOTES_ARRAY: NoteWithId[] = notes
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
		? sortedNotes
			.filter((note) =>
				searchTags
					.split(" ") // "+"
					.every((element) =>
						Object.keys(note.tags!).includes(element)
					)
			)
		: sortedNotes;

	useEffect(() => {
		if (!user) {
			router.push("signin");
		}
	}, [router, user]);

	useEffect(() => { console.log(searchTags) }, [searchTags])

	return (
		<>
			<h1 className="text-center">
				Your Filtered Notes ({filteredNotes.length})
			</h1>

			<TagsSearchBar
				selectedTags={searchTags}
				modifiesUrl={true}
				sortBy={sortBy}
			/>

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

			{filteredNotes.map((note) => (
				<NoteCard
					key={note.id}
					note={note}
					noteKey={note.id}
					show140chars={true}
				/>
			))}
		</>
	);
}

export default function HomePageWrappedInSuspense() {
	return (
		<Suspense
			fallback={
				<h1 className="text-center">
					Your Notes Are Pending... <Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</h1>
			}
		>
			<HomePage />
		</Suspense>
	);
}