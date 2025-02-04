"use client";
import PrivateRoute from "@/components/PrivateRoute";
import Tag from "@/components/Tag";
import useTags from "@/context/useTags";
import { Tag as ITag } from "@/types";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";

export default function TagsPage() {
	return (
		<PrivateRoute>
			<Tags />
		</PrivateRoute>
	);
}

type SortBy = "alphabetically" | "byTagNotesNum";

function Tags() {
	const { tags, tagsNum, isFetching, getTagNotesNum, getTagById } = useTags();
	const [sortBy, setSortBy] = useState<SortBy>("alphabetically");

	const sortTags = useCallback(() => {
		console.log("sorting tags", sortBy, "...");

		if (sortBy === "alphabetically") {
			// map tags to {[tagValue]: tagId}:
			const tagsValueIdObject = tags
				? Object
					.values(tags)
					.reduce((prev, curr) => ({ ...prev, [curr.tag]: curr.id }), {} as { [key: string]: string })
				: {}

			const tagsValuesSortedAlphabetically = Object.keys(tagsValueIdObject).toSorted();

			const tagsSortedAlphabetically = tagsValuesSortedAlphabetically
				.map(value => {
					const tagId = tagsValueIdObject[value];
					const tag = getTagById(tagId)

					return tag
				})
				.filter(t => t !== null) as ITag[]

			return tagsSortedAlphabetically
		} else {
			const tagsSortedByNotesNum: ITag[] = tags
				? Object.values(tags).toSorted((a, b) => getTagNotesNum(a.id) - getTagNotesNum(b.id))
				: []

			return tagsSortedByNotesNum.reverse();
		}

	}, [tags, getTagById, sortBy, getTagNotesNum]);

	const sortedTags = sortTags()

	useEffect(() => window.scrollTo({ top: 0, behavior: "instant" }), []);

	return (
		<>
			<header>
				<h1 className="text-center mb-3">
					Tags ({tagsNum})
				</h1>

				<Form.Select
					className="mb-3"
					value={sortBy}
					onChange={e => setSortBy(e.currentTarget.value as SortBy)}
				>
					<option value="alphabetically">sort alphabetically</option>
					<option value="byTagNotesNum">sort by tag notes number</option>
				</Form.Select>
			</header>

			<div
				id="sorted-tags"
				className="text-center"
			>
				{
					isFetching
						? <>
							Loading your tags...{" "}
							<Spinner animation="border" role="status">
								<span className="visually-hidden">Loading...</span>
							</Spinner>
						</>
						: sortedTags
							.map(tag => (
								<Link href={`/notes?tags=${tag.id}`} key={tag.id}>
									<Tag
										value={`${tag.tag} (${getTagNotesNum(tag.id)})`}
									/>
								</Link>
							))

				}
			</div>
		</>
	);
}
