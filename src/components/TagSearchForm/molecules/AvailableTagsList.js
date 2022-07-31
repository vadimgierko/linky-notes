import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FormTagButton from "../atoms/FormTagButton";
import TagLinkButtonGeneratedByInput from "../atoms/TagLinkButtonGeneratedByInput";

export default function AvailableTagsList({
	inputValue,
	form,
	search,
	addExistingTag,
	addNewTag,
	resetInput,
}) {
	const tags = useSelector((state) => state.tags.value);
	const [availableTags, setAvailableTags] = useState(); // [{tag: "", key: ""}]

	function generateAvailableTags(input) {
		if (input && input.length) {
			if (tags && Object.entries(tags).length) {
				const stateTagsArray = Object.entries(tags);
				// => [["sdcsdcasdcasd", {tag: "test"}], ["okvf98u98dfv", {tag: "app"}]
				let filteredTags = [];
				for (let i = 0; i < stateTagsArray.length; i++) {
					if (stateTagsArray[i][1].tag.includes(input)) {
						filteredTags.push({
							tag: stateTagsArray[i][1].tag,
							key: stateTagsArray[i][0],
						});
					}
				}
				setAvailableTags(filteredTags);
			}
		} else {
			setAvailableTags();
		}
	}

	useEffect(() => {
		generateAvailableTags(inputValue);
	}, [inputValue]);

	if (!inputValue || !inputValue.length) return null;

	if (form)
		return (
			<div className="available-tags-list">
				{availableTags && availableTags.length ? (
					availableTags.map((tag, i) => (
						<FormTagButton
							key={tag.key}
							tag={tag.tag}
							onClick={() => {
								addExistingTag(tag.key);
								resetInput();
							}}
						/>
					))
				) : (
					<FormTagButton
						tag={inputValue}
						onClick={() => {
							addNewTag(inputValue);
							resetInput();
						}}
					/>
				)}
			</div>
		);

	return (
		<div className="available-tags-list">
			{availableTags &&
				availableTags.map((tag) => (
					<TagLinkButtonGeneratedByInput
						key={tag.key}
						tag={tag.tag}
						link={
							search
								? "/search" + search + "+" + tag.key
								: "/search?name=" + tag.key
						}
					/>
				))}
		</div>
	);
}
