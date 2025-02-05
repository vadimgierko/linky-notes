"use client";
import PrivateRoute from "@/components/PrivateRoute";
import useTags from "@/context/useTags";
import { Tag as ITag } from "@/types";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Dropdown, Form, Spinner } from "react-bootstrap";

export default function TagsPage() {
	return (
		<PrivateRoute>
			<Tags />
		</PrivateRoute>
	);
}

type SortBy =
	| "alphabetically"
	| "tag notes number"
	| "first created"
	| "last created";

const allowedSortByValues: SortBy[] = [
	"alphabetically",
	"tag notes number",
	"last created",
	"first created"
];

function Tags() {
	const {
		tags,
		tagsNum,
		isFetching,
		getTagNotesNum,
		getTagById,
		updateTag
	} = useTags();

	const [sortBy, setSortBy] = useState<SortBy>("alphabetically");

	const sortTags = useCallback(() => {
		console.log("sorting tags by", sortBy, "...");

		const defaultSortedTags = tags
			? Object.values(tags).reduce((prev, curr) => [...prev, curr], [] as ITag[])
			: []

		switch (sortBy) {
			case "alphabetically":
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

				return tagsSortedAlphabetically;
			case "tag notes number":
				const tagsSortedByNotesNum: ITag[] = tags
					? Object.values(tags).toSorted((a, b) => getTagNotesNum(a.id) - getTagNotesNum(b.id))
					: []
				return tagsSortedByNotesNum.reverse();
			case "first created":
				return defaultSortedTags
			case "last created":
				return defaultSortedTags.toReversed();
			default:
				return defaultSortedTags
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
					{
						allowedSortByValues
							.map(value => (
								<option
									value={value}
									key={value}
								>
									sort by: {value}
								</option>
							))
					}
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
								<Dropdown
								key={tag.id}
								style={{
									display: "inline-block",
								}}
								className="m-1"
								>
									<Dropdown.Toggle>
										{`${tag.tag} (${getTagNotesNum(tag.id)})`}
									</Dropdown.Toggle>

									<Dropdown.Menu>
										<Link href={`/notes?tags=${tag.id}`} passHref legacyBehavior>
											<Dropdown.Item >🔎</Dropdown.Item>
										</Link>

										<Dropdown.Item
											onClick={async () => {
												const newTagValue = prompt(`Provide the new tag value for ${tag.tag}:`, tag.tag);

												if (newTagValue && newTagValue.trim().length) {
													await updateTag(newTagValue, tag.id);
													alert(`${tag.tag} tag was updated to ${newTagValue}!`)
												} else {
													alert("New tag value should have at least 1 character!");
												}
											}}
										>
											✏️
										</Dropdown.Item>
										<Dropdown.Item>🗑️</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
								// <Link href={`/notes?tags=${tag.id}`} key={tag.id}>
								// 	<Tag
								// 		value={`${tag.tag} (${getTagNotesNum(tag.id)})`}
								// 	/>
								// </Link>
							))

				}
			</div>
		</>
	);
}
