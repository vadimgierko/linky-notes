import { useState } from "react";
import FormTagButton from "../atoms/FormTagButton";
import TagLinkButtonGeneratedByInput from "../atoms/TagLinkButtonGeneratedByInput";

export default function AvailableTagsList({
	inputedTagValue,
	form,
	searchLink,
}) {
	const [availableTags, setAvailableTags] = useState();
	// useEffect(() => {
	// 	setAvailableTags(generateAvailableTags(inputedTagValue));
	// }, [inputedTagValue]);

	if (!inputedTagValue) return null;
	if (!availableTags || !availableTags.length) return null;

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
			<TagLinkButtonGeneratedByInput
				tag={inputedTagValue}
				link={
					"/search?name=" +
					(searchLink
						? searchLink + "+" + inputedTagValue
						: inputedTagValue)
				}
			/>
			{availableTags.map((tag, i) => (
				<TagLinkButtonGeneratedByInput
					key={tag}
					tag={tag}
					link={
						"/search?name=" +
						(searchLink ? searchLink + "+" + tag : tag)
					}
				/>
			))}
		</div>
	);
}
