"use client";
import PrivateRoute from "@/components/PrivateRoute";
import Tag from "@/components/Tag";
import useTags from "@/context/useTags";
import { Tag as ITag } from "@/types";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import { Spinner } from "react-bootstrap";

export default function TagsPage() {
	return (
		<PrivateRoute>
			<Tags />
		</PrivateRoute>
	);
}

function Tags() {
	const { tags, isFetching, getTagNotesNum, getTagById } = useTags();

	const sortTags = useCallback(() => {
		console.log("sorting tags...")
		// map tags to {[tagValue]: tagId}:
		const tagsValueIdObject = tags
			? Object
				.values(tags)
				.reduce((prev, curr) => ({ ...prev, [curr.tag]: curr.id }), {} as { [key: string]: string })
			: {}

		const sortedTagsValues = Object.keys(tagsValueIdObject).toSorted();

		const sortedTags = sortedTagsValues
			.map(value => {
				const tagId = tagsValueIdObject[value];
				const tag = getTagById(tagId)

				return tag
			})
			.filter(t => t !== null) as ITag[]

		return sortedTags
	}, [tags, getTagById]);

	const sortedTags = sortTags()

	useEffect(() => window.scrollTo({ top: 0, behavior: "instant" }), []);

	return (
		<>
			<h1 className="text-center mb-3">
				Your tags ({tags ? Object.keys(tags).length : 0})
			</h1>

			{isFetching && (
				<div className="text-center">
					Loading your tags...{" "}
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			)}

			<div
				id="sorted-tags"
				className="text-center"
			>
				{
					sortedTags
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
