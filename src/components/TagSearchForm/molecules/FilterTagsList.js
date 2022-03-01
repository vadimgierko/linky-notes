import TagButtonWithTrashIcon from "../atoms/TagButtonWithTrashIcon";
import TagLinkButtonWithTrashIcon from "../atoms/TagLinkButtonWithTrashButton";
import { useStore } from "../../../store/Store";
import { useEffect, useState } from "react";

export default function FilterTagsList({
	filterTagsKeys, // ARRAY !!!
	searchLink,
	form,
}) {
	const { state } = useStore();
	const [tags, setTags] = useState();

	// function deleteTag(tag) {
	// 	//const updatedTags = filterTags.filter((item) => item !== tag);
	// 	//setFilterTags(updatedTags);
	// }

	// function generateLinkAfterDeletionOfTag(tag) {
	// 	const updatedTags = filterTags.filter((item) => item !== tag);
	// 	let link = "";
	// 	if (updatedTags && updatedTags.length) {
	// 		for (let i = 0; i < updatedTags.length; i++) {
	// 			if (i === 0) {
	// 				link = updatedTags[i];
	// 			} else {
	// 				link = link + "+" + updatedTags[i];
	// 			}
	// 		}
	// 	}
	// 	return link;
	// }

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
		if (state.tags && Object.entries(state.tags).length) {
			if (filterTagsKeys && filterTagsKeys.length) {
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
		}
	}, [state]);

	// useEffect(() => {
	// 	console.log("tags in FilterTagsList:", tags);
	// }, [tags]);

	// useEffect(() => {
	// 	console.log("searchLink in FilterTagsList:", searchLink);
	// }, [searchLink]);

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
						"/search?name=" +
						generateNewSearchLinkAfterDeletionOfTag(i)
					}
					//link={"/search?name=" + tag.key}
				/>
			))}
		</div>
	);
}
