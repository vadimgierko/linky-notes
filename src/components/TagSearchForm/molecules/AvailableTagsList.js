import { useState, useEffect } from "react";
import { useStore } from "../../../store/Store";
import FormTagButton from "../atoms/FormTagButton";
import TagLinkButtonGeneratedByInput from "../atoms/TagLinkButtonGeneratedByInput";

export default function AvailableTagsList({ inputValue, form, search }) {
	const { state } = useStore();
	const [availableTags, setAvailableTags] = useState(); // [{tag: "", key: ""}]

	function generateAvailableTags(input) {
		if (input && input.length) {
			if (state.tags && Object.entries(state.tags).length) {
				const stateTagsArray = Object.entries(state.tags);
				// => [["sdcsdcasdcasd", {tag: "test"}], ["okvf98u98dfv", {tag: "app"}]
				let tags = [];
				for (let i = 0; i < stateTagsArray.length; i++) {
					if (stateTagsArray[i][1].tag.includes(input)) {
						tags.push({
							tag: stateTagsArray[i][1].tag,
							key: stateTagsArray[i][0],
						});
					}
				}
				setAvailableTags(tags);
			}
		} else {
			setAvailableTags();
		}
	}

	useEffect(() => {
		generateAvailableTags(inputValue);
	}, [inputValue]);

	if (!inputValue || !inputValue.length) return null;

	//================= if (form)

	// if (form)
	// 	return (
	// 		<div className="available-tags-list">
	// 			<FormTagButton
	// 				tag={inputedTagValue}
	// 				onClick={() => {
	// 					setFilterTags([...filterTags, inputedTagValue]);
	// 					setInputedTagValue("");
	// 				}}
	// 			/>
	// 			{availableTags.map((tag, i) => (
	// 				<FormTagButton
	// 					key={tag}
	// 					tag={tag}
	// 					onClick={() => {
	// 						setFilterTags([...filterTags, tag]);
	// 						setInputedTagValue("");
	// 					}}
	// 				/>
	// 			))}
	// 		</div>
	// 	);

	return (
		<div className="available-tags-list">
			{/* <TagLinkButtonGeneratedByInput
				tag={inputedTagValue}
				link={
					"/search?name=" +
					(searchLink
						? searchLink + "+" + inputedTagValue
						: inputedTagValue)
				}
			/> */}
			{availableTags &&
				availableTags.map((tag, i) => (
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
