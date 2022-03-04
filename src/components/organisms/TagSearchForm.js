import { useEffect, useState } from "react";
import TagSearchFormInput from "../TagSearchForm/atoms/TagSearchFormInput";
import FilterTagsList from "../TagSearchForm/molecules/FilterTagsList";
import AvailableTagsList from "../TagSearchForm/molecules/AvailableTagsList";

export default function TagSearchForm({
	search,
	form = false,
	addExistingTag,
	addNewTag,
	deleteExistingTag,
	deleteNewTag,
	existingTags,
	newTags,
}) {
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
			<FilterTagsList
				search={search}
				form={form}
				existingTags={existingTags}
				newTags={newTags}
				deleteExistingTag={deleteExistingTag}
				deleteNewTag={deleteNewTag}
			/>
			<AvailableTagsList
				inputValue={inputValue}
				form={form}
				search={search}
				addExistingTag={addExistingTag}
				addNewTag={addNewTag}
				resetInput={() => setInputValue("")}
			/>
		</div>
	);
}
