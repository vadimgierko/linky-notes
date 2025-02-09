"use client";

import useTags from "@/context/useTags";
import { Tag as ITag, SortBy, Tags } from "@/types";
import { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Tag from "../Tag";
import Link from "next/link";

interface TagsSearchBarProps {
	onFoundTagsClick?: (tag: ITag) => void;
	searchTagsIdsString?: string;
	sortBy?: SortBy;
}

export default function TagsSearchBar({
	onFoundTagsClick,
	searchTagsIdsString,
	sortBy,
}: TagsSearchBarProps) {
	const debouncedSetFoundTags = useRef<NodeJS.Timeout | null>(null);

	const { tags, getTagNotesNum, getTagById } = useTags();

	const [input, setInput] = useState<string>("");
	const [foundTags, setFoundTags] = useState<Tags>({});

	return (
		<div className="tags-search-bar">
			<Form.Control
				className="form-control mb-2"
				value={input}
				placeholder="type something to search tags..."
				onChange={(e) => {
					const changedInput = e.target.value;
					setInput(changedInput);

					// clear prev debounce timer:
					if (debouncedSetFoundTags.current) {
						clearTimeout(debouncedSetFoundTags.current);
					}

					// reassign debounce timer:
					debouncedSetFoundTags.current = setTimeout(() => {
						// console.log("debouncing")
						//=============================================
						// when user types, set found tags to show them:
						if (changedInput && changedInput.length) {
							if (tags && Object.keys(tags).length) {
								const foundTags: ITag[] = Object.values(tags).filter((tag) =>
									tag.tag.toLowerCase().startsWith(changedInput.toLowerCase())
								);

								setFoundTags(
									foundTags.reduce(
										(prev, curr) => ({ ...prev, [curr.id]: curr }),
										{} as Tags
									)
								);
							}
						} else {
							// if input is cleared:
							setFoundTags({});
						}
					}, 500);
				}}
			/>

			{/*======================================== found tags */}
			<div className="tags-search-bar__found-tags">
				{/**
				 * if /notes found tags should be links to /notes?tags=...;
				 * if /tags found tags should be links to /tags/[tagId];
				 * if /notes/add or /update tags should be just buttons with onClick to add tag to the note's tags
				 */}
				{Object.keys(foundTags).map((id) => {
					const tag = getTagById(id);

					if (!tag) return null;

					if (onFoundTagsClick) {
						return (
							<Tag
								key={id}
								value={`${tag.tag} (${getTagNotesNum(id)})`} // 🚀❗ fix using !
								onClick={() => {
									onFoundTagsClick(getTagById(id)!);
									// clear found tags:
									setFoundTags({});
									// clear input:
									setInput("");
								}}
							/>
						);
					} else {
						return (
							<Link
								href={`?tags=${
									searchTagsIdsString ? searchTagsIdsString + "+" + id : id
								}&sortBy=${sortBy}`}
								key={id}
							>
								<Tag
									key={id}
									value={`${tag.tag} (${getTagNotesNum(id)})`} // 🚀❗ fix using !
									onClick={() => {
										// clear found tags:
										setFoundTags({});
										// clear input:
										setInput("");
									}}
								/>
							</Link>
						);
					}
				})}
			</div>
		</div>
	);
}
