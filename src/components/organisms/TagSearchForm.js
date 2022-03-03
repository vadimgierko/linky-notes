import { useEffect, useState } from "react";
import TagSearchFormInput from "../TagSearchForm/atoms/TagSearchFormInput";
import FilterTagsList from "../TagSearchForm/molecules/FilterTagsList";
import AvailableTagsList from "../TagSearchForm/molecules/AvailableTagsList";

export default function TagSearchForm({ search, form = false }) {
	const [inputValue, setInputValue] = useState("");

	function handleInputChange(e) {
		setInputValue(e.target.value);
	}

	useEffect(() => setInputValue(""), [search]);

	return (
		<div className="tag-search-form">
			<TagSearchFormInput
				inputValue={inputValue}
				placeholder="type some tag"
				handleChange={handleInputChange}
			/>
			<FilterTagsList search={search} form={form} />
			<AvailableTagsList
				inputValue={inputValue}
				form={form}
				search={search}
			/>
		</div>
	);
}
