"use client";

import { Button, Form } from "react-bootstrap";
import TagComponent from "./TagComponent";
import { useCallback, useEffect, useState } from "react";
import useTags from "@/context/useTags";
import { Tag as ITag } from "@/types";

type SortBy =
	| "alphabetically"
	| "tag notes number"
	| "first created"
	| "last created"
	| "first updated"
	| "last updated";

const allowedSortByValues: SortBy[] = [
	"alphabetically",
	"tag notes number",
	"last created",
	"first created",
	"first updated",
	"last updated",
];

export default function Tags() {
	const { tags, tagsNum, getTagNotesNum, getTagById, addTag } = useTags();

	const [sortBy, setSortBy] = useState<SortBy>("alphabetically");

	const sortTags = useCallback(() => {
		console.log("sorting tags by", sortBy, "...");

		const defaultSortedTags = tags
			? Object.values(tags).reduce(
					(prev, curr) => [...prev, curr],
					[] as ITag[]
			  )
			: [];

		switch (sortBy) {
			case "alphabetically":
				// map tags to {[tagValue]: tagId}:
				const tagsValueIdObject = tags
					? Object.values(tags).reduce(
							(prev, curr) => ({ ...prev, [curr.value]: curr.id }),
							{} as { [key: string]: string }
					  )
					: {};

				const tagsValuesSortedAlphabetically =
					Object.keys(tagsValueIdObject).toSorted();

				const tagsSortedAlphabetically = tagsValuesSortedAlphabetically
					.map((value) => {
						const tagId = tagsValueIdObject[value];
						const tag = getTagById(tagId);

						return tag;
					})
					.filter((t) => t !== null) as ITag[];

				return tagsSortedAlphabetically;
			case "tag notes number":
				const tagsSortedByNotesNum: ITag[] = tags
					? Object.values(tags).toSorted(
							(a, b) => getTagNotesNum(a.id) - getTagNotesNum(b.id)
					  )
					: [];
				return tagsSortedByNotesNum.reverse();
			case "first created":
				return defaultSortedTags;
			case "last created":
				return defaultSortedTags.toReversed();
			case "first updated":
				const tagsSortedByFirstUpdated: ITag[] = tags
					? Object.values(tags).toSorted((a, b) => a.updatedAt - b.updatedAt)
					: [];
				return tagsSortedByFirstUpdated;
			case "last updated":
				const tagsSortedByLastUpdated: ITag[] = tags
					? Object.values(tags).toSorted((a, b) => b.updatedAt - a.updatedAt)
					: [];
				return tagsSortedByLastUpdated;
			default:
				return defaultSortedTags;
		}
	}, [tags, getTagById, sortBy, getTagNotesNum]);

	const sortedTags = sortTags();

	useEffect(() => window.scrollTo({ top: 0, behavior: "instant" }), []);

	return (
		<>
			<header>
				<h1 className="text-center mb-3">
					Tags ({tagsNum}){" "}
					<Button
						onClick={async () => {
							const newTagValue = prompt("Enter the new tag value:");
							if (newTagValue) {
								await addTag(newTagValue);

								alert(`Tag ${newTagValue} added successfully!`);
							}
						}}
					>
						+
					</Button>
				</h1>

				<Form.Select
					className="mb-3"
					value={sortBy}
					onChange={(e) => setSortBy(e.currentTarget.value as SortBy)}
				>
					{allowedSortByValues.map((value) => (
						<option value={value} key={value}>
							sort by: {value}
						</option>
					))}
				</Form.Select>
			</header>

			<div id="sorted-tags" className="text-center">
				{sortedTags.map((tag) => (
					<TagComponent key={tag.id} tag={tag} />
				))}
			</div>
		</>
	);
}
