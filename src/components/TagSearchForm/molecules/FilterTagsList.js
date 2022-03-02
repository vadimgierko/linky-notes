import TagButtonWithTrashIcon from "../atoms/TagButtonWithTrashIcon";
import TagLinkButtonWithTrashIcon from "../atoms/TagLinkButtonWithTrashIcon";
import { useStore } from "../../../store/Store";
import { useEffect, useState } from "react";

export default function FilterTagsList({ filterTagsKeys, form }) {
	const { state } = useStore();
	const [tags, setTags] = useState();

	function generateNewSearchLinkAfterDeletionOfTag(n) {
		let newLink = "";
		for (let i = 0; i < tags.length; i++) {
			if (n > 0) {
				if (i === 0) {
					newLink = newLink + tags[i].key;
				} else {
					if (i !== n) {
						newLink = newLink + "+" + tags[i].key;
					}
				}
			} else {
				if (i !== 0 && i === 1) {
					newLink = newLink + tags[i].key;
				} else if (i !== 0 && i > 1) {
					newLink = newLink + "+" + tags[i].key;
				}
			}
		}
		return newLink;
	}

	useEffect(() => {
		if (filterTagsKeys && filterTagsKeys.length) {
			if (state.tags && Object.entries(state.tags).length) {
				let retrievedTags = [];
				for (let i = 0; i < filterTagsKeys.length; i++) {
					if (state.tags[filterTagsKeys[i]]) {
						retrievedTags.push({
							tag: state.tags[filterTagsKeys[i]].tag,
							key: filterTagsKeys[i],
						});
					}
				}
				setTags(retrievedTags);
			}
		} else {
			setTags();
		}
	}, [state, filterTagsKeys]);

	if (!tags || !tags.length) return null;

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
			{tags.map((tag, i) => (
				<TagLinkButtonWithTrashIcon
					key={tag.key}
					tag={tag.tag}
					link={
						generateNewSearchLinkAfterDeletionOfTag(i).length
							? "/search?name=" +
							  generateNewSearchLinkAfterDeletionOfTag(i)
							: ""
					}
				/>
			))}
		</div>
	);
}
