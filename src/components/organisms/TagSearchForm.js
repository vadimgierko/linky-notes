import { useEffect, useState } from "react";
import TagSearchFormInput from "../TagSearchForm/atoms/TagSearchFormInput";
import FilterTagsList from "../TagSearchForm/molecules/FilterTagsList";
import AvailableTagsList from "../TagSearchForm/molecules/AvailableTagsList";

export default function TagSearchForm({
	filterTagsKeys,
	searchLink,
	form = false,
}) {
	const [inputValue, setInputValue] = useState("");

	function handleInputChange(e) {
		setInputValue(e.target.value);
	}

	useEffect(() => setInputValue(""), [searchLink]);

	// useEffect(
	// 	() => console.log("input value in TagSearchForm:", inputValue),
	// 	[inputValue]
	// );

	return (
		<div className="tag-search-form">
			<TagSearchFormInput
				inputValue={inputValue}
				placeholder="type some tag"
				handleChange={handleInputChange}
			/>
			<FilterTagsList
				filterTagsKeys={filterTagsKeys}
				searchLink={searchLink}
				form={form}
			/>
			<AvailableTagsList
				inputValue={inputValue}
				form={form}
				searchLink={searchLink}
			/>
		</div>
	);
}
