import { useEffect, useState } from "react";
import { useStore } from "../../../store/Store";
import TagButtonWithTrashIcon from "../atoms/TagButtonWithTrashIcon";
import TagLinkButtonWithTrashIcon from "../atoms/TagLinkButtonWithTrashIcon";

export default function FilterTagsList({ search, form }) {
	const { state } = useStore();
	const [filterTags, setFilterTags] = useState(); // [{tag: "", key: ""}]

	function getFilterTagsFromSearch(search) {
		if (search) {
			const tagsKeysStringFromSearch = search.slice(6);

			if (tagsKeysStringFromSearch.length) {
				const tagsKeysArray = tagsKeysStringFromSearch.split("+");

				if (state.tags) {
					const retrievedTagsObjectsArray = tagsKeysArray.map(
						(key) => ({ key: key, tag: state.tags[key].tag })
					);
					setFilterTags(retrievedTagsObjectsArray);
				} else {
					console.log(
						"There are no tags in state... Cannot get tags from search."
					);
				}
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
		getFilterTagsFromSearch(search);
	}, [search]);

	if (!filterTags || !filterTags.length)
		return <p className="filter-tags-list">There are no filter tags...</p>;

	//================== if (form)

	// if (form)
	// 	return (
	// 		<div className="filter-tags-list">
	// 			{filterTags.map((tag) => (
	// 				<TagButtonWithTrashIcon
	// 					key={tag}
	// 					tag={tag}
	// 					onTrashIconClick={() => deleteTag(tag)}
	// 				/>
	// 			))}
	// 		</div>
	// 	);

	return (
		<div className="filter-tags-list">
			{filterTags.map((tag, i) => (
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
