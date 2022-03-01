import { useEffect, useState } from "react";
import { useStore } from "../../store/Store";
import TagSearchFormInput from "../TagSearchForm/atoms/TagSearchFormInput";
import FilterTagsList from "../TagSearchForm/molecules/FilterTagsList";
import AvailableTagsList from "../TagSearchForm/molecules/AvailableTagsList";

export default function TagSearchForm({
	filterTagsKeys, // TAGS KEYS ARRAY !!!
	searchLink,
	form = false,
}) {
	const [inputedTagValue, setInputedTagValue] = useState("");

	if (!filterTagsKeys || !searchLink)
		return (
			<div className="tag-search-form">
				<TagSearchFormInput
					defaultValue={inputedTagValue}
					placeholder="type some tag"
					handleChange={setInputedTagValue}
				/>
			</div>
		);

	return (
		<div className="tag-search-form">
			<TagSearchFormInput
				defaultValue={inputedTagValue}
				placeholder="type some tag"
				handleChange={setInputedTagValue}
			/>
			<FilterTagsList
				filterTagsKeys={filterTagsKeys}
				searchLink={searchLink}
				form={form}
			/>
			<AvailableTagsList
				inputedTagValue={inputedTagValue}
				form={form}
				searchLink={searchLink}
			/>
		</div>
	);
}
