"use client";

import { Tag as ITag, SortBy, Tags } from "@/types";
import { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Tag from "../Tag";
import Link from "next/link";
import TagWithTrashIcon from "../TagWithTrashIcon";
import sortTagsAlphabetically from "@/lib/sortTagsAlphabetically";
import useTags from "@/context/useTags";

function FoundTagsButtons({ foundTags }: { foundTags: Tags }) {
	return (
		<div className="tags-search-bar__found-tags">
			{Object.values(foundTags).map((tag) => {
				return <Tag key={tag.id} value={tag.tag} />;
			})}
		</div>
	);
}

function FoundTagsLinks({
	foundTags,
	onFoundTagClick,
}: {
	foundTags: { tag: ITag; tagLink: string }[];
	onFoundTagClick: () => void;
}) {
	const { getTagNotesNum } = useTags();
	return (
		<div className="tags-search-bar__found-tags">
			{foundTags.map((foundTag) => {
				const { tagLink, tag } = foundTag;

				return (
					<Link href={tagLink} key={tag.id}>
						<Tag
							key={tag.id}
							value={`${tag.tag} (${getTagNotesNum(tag.id)})`}
							onClick={onFoundTagClick}
						/>
					</Link>
				);
			})}
		</div>
	);
}

function SelectedTagsLinks({
	selectedTags,
}: {
	selectedTags: { tag: ITag; tagLink: string }[];
}) {
	return (
		<div className="tags-search-bar__selected-tags">
			{Object.values(selectedTags).map((selectedTag) => {
				const { tagLink, tag } = selectedTag;

				return (
					<Link href={tagLink} key={tag.id}>
						<TagWithTrashIcon tag={tag} />
					</Link>
				);
			})}
		</div>
	);
}

// function TagsSearch({
// 	onFoundTagsClick,
// 	searchTagsIdsString,
// 	sortBy,
// }: TagsSearchBarProps) {
// 	const { tags, getTagNotesNum, getTagById } = useTags();

// 	const [foundTags, setFoundTags] = useState<Tags>({});
// 	const foundTagsSortedAlphabetically = sortTagsAlphabetically(foundTags);

// 	return (
// 		<div className="tags-search-bar">
// 			{/*======================================== found tags */}
// 			<div className="tags-search-bar__found-tags">
// 				{/**
// 				 * if /notes found tags should be links to /notes?tags=...;
// 				 * if /tags found tags should be links to /tags/[tagId];
// 				 * if /notes/add or /update tags should be just buttons with onClick to add tag to the note's tags
// 				 */}
// 				{foundTagsSortedAlphabetically.map((tag) => {
// 					if (onFoundTagsClick) {
// 						return (
// 							<Tag
// 								key={tag.id}
// 								value={`${tag.tag} (${getTagNotesNum(tag.id)})`}
// 								onClick={() => {
// 									onFoundTagsClick(getTagById(tag.id)!);
// 									// clear found tags:
// 									setFoundTags({});
// 									// clear input:
// 									setInput("");
// 								}}
// 							/>
// 						);
// 					} else {
// 						return (
// 							<Link
// 								href={`?tags=${
// 									searchTagsIdsString
// 										? searchTagsIdsString + "+" + tag.id
// 										: tag.id
// 								}&sortBy=${sortBy}`}
// 								key={tag.id}
// 							>
// 								<Tag
// 									key={tag.id}
// 									value={`${tag.tag} (${getTagNotesNum(tag.id)})`}
// 									onClick={() => {
// 										// clear found tags:
// 										setFoundTags({});
// 										// clear input:
// 										setInput("");
// 									}}
// 								/>
// 							</Link>
// 						);
// 					}
// 				})}
// 			</div>
// 		</div>
// 	);
// }

function InputAndFoundTags({
	useLinks,
	searchTagsIdsString,
	sortBy,
}: {
	useLinks: boolean;
	searchTagsIdsString: string;
	sortBy: SortBy;
}) {
	const debouncedSetFoundTags = useRef<NodeJS.Timeout | null>(null);

	const { tags } = useTags();
	const [input, setInput] = useState<string>("");

	const [foundTags, setFoundTags] = useState<Tags>({});
	const foundTagsSortedAlphabetically = sortTagsAlphabetically(foundTags);

	return (
		<>
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
						// console.log("debouncing input")
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

			{useLinks ? (
				<FoundTagsLinks
					foundTags={foundTagsSortedAlphabetically.map((tag) => ({
						tag,
						tagLink: `?tags=${
							searchTagsIdsString ? searchTagsIdsString + "+" + tag.id : tag.id
						}&sortBy=${sortBy}`,
					}))}
					onFoundTagClick={() => {
						// clear found tags:
						setFoundTags({});
						// clear input:
						setInput("");
					}}
				/>
			) : (
				<FoundTagsButtons foundTags={foundTags} />
			)}
		</>
	);
}

const TagsSearchBar = {
	InputAndFoundTags,
	SelectedTagsLinks,
};

export default TagsSearchBar;
