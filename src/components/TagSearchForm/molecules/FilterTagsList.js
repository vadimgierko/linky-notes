import { useEffect, useState } from "react";
import { useStore } from "../../../store/Store";
import TagButtonWithTrashIcon from "../atoms/TagButtonWithTrashIcon";
import TagLinkButtonWithTrashIcon from "../atoms/TagLinkButtonWithTrashIcon";

export default function FilterTagsList({
	search,
	form,
	existingTags,
	newTags,
	deleteExistingTag,
	deleteNewTag,
}) {
	const { state } = useStore();
	const [filterTags, setFilterTags] = useState(); // [{tag: "", key: ""}]

	function getFilterTagsFromSearch(search) {
		if (search) {
			const tagsKeysStringFromSearch = search.slice(6);

			if (tagsKeysStringFromSearch.length) {
				const tagsKeysArray = tagsKeysStringFromSearch.split("+");

				const retrievedTagsObjectsArray = tagsKeysArray.map((key) => ({
					key: key,
					tag: state.tags[key].tag,
				}));

				setFilterTags(retrievedTagsObjectsArray);
			} else {
				setFilterTags();
			}
		} else {
			setFilterTags();
		}
	}

	function generateNewSearchLinkAfterDeletionOfTag(
		deletedTagKey,
		prevSearch
	) {
		const tagsKeysStringFromPrevSearch = prevSearch.slice(6);
		const prevTagsKeysArray = tagsKeysStringFromPrevSearch.split("+");

		const newTagsKeysArray = prevTagsKeysArray.filter(
			(key) => key !== deletedTagKey
		);

		const newSearchLinkString = newTagsKeysArray.join("+");

		if (newSearchLinkString.length) {
			return "/search?name=" + newSearchLinkString;
		} else {
			return "";
		}
	}

	useEffect(() => {
		if (state && state.tags && Object.entries(state.tags).length) {
			getFilterTagsFromSearch(search);
		} else {
			console.log(
				"There are no tags in state... Cannot get tags from search at the moment. Wait until state tags will be fetched."
			);
		}
	}, [search, state]);

	if (form) {
		if (
			(existingTags && Object.entries(existingTags).length) ||
			(newTags && Object.entries(newTags).length)
		) {
			return (
				<div className="filter-tags-list">
					{existingTags && Object.entries(existingTags).length
						? Object.entries(existingTags).map((tagArray) => (
								<TagButtonWithTrashIcon
									key={tagArray[0]}
									tag={tagArray[1]}
									onTrashIconClick={() => {
										console.log(
											"you want to delete me...",
											tagArray[1].tag
										);
										deleteExistingTag(tagArray[0]);
									}}
								/>
						  ))
						: null}
					{newTags && Object.entries(newTags).length
						? newTags.map((tag) => (
								<TagButtonWithTrashIcon
									key={tag}
									tag={{ tag: tag }}
									onTrashIconClick={() => {
										console.log(
											"you want to delete me...",
											tag
										);
										deleteNewTag(tag);
									}}
								/>
						  ))
						: null}
				</div>
			);
		} else {
			return (
				<p className="filter-tags-list">There are no filter tags...</p>
			);
		}
	}

	if (!form && (!filterTags || !filterTags.length))
		return <p className="filter-tags-list">There are no filter tags...</p>;

	return (
		<div className="filter-tags-list">
			{filterTags.map((tag) => (
				<TagLinkButtonWithTrashIcon
					key={tag.key}
					tag={tag.tag}
					link={() =>
						generateNewSearchLinkAfterDeletionOfTag(tag.key, search)
					}
				/>
			))}
		</div>
	);
}
