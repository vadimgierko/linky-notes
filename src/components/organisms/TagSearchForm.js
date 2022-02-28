import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/use-theme";
import { Link } from "react-router-dom";
import { useStore } from "../../store/Store";
import TagSearchFormInput from "../atoms/TagSearchForm/TagSearchFormInput";
import TagButtonWithTrashIcon from "../atoms/TagSearchForm/TagButtonWithTrashIcon";
import TagButtonGeneratedByInput from "../atoms/TagButtonGeneratedByInput";
import FormTagButton from "../atoms/FormTagButton";
import TagLinkButtonWithTrashIcon from "../atoms/TagSearchForm/TagLinkButtonWithTrashButton";

export default function TagSearchForm({
	chosenTags = [],
	setChosenTags,
	searchLinkFromFilterTags,
	setSearchLinkFromFilterTags,
	form = false,
}) {
	const { theme } = useTheme();
	const { state } = useStore();

	const [inputedTagValue, setInputedTagValue] = useState("");
	const [availableTags, setAvailableTags] = useState(null);

	function deleteTag(tag) {
		const updatedTags = chosenTags.filter((item) => item !== tag);
		setChosenTags(updatedTags);
	}

	function generateAvailableTags(input) {
		if (!state.tags) return;
		let availableTags = [];
		for (let i = 0; i < tags.length; i++) {
			const tag = tags[i];
			let sameLettersNum = 0;
			for (let n = 0; n < input.length; n++) {
				if (input[n] === tag[n]) {
					// check every letter in order
					sameLettersNum++;
					// if it's the same, put tag into array
					if (sameLettersNum === input.length) {
						const isThisTagInArrayAlready = availableTags.find(
							(availableTag) => availableTag === tag
						);
						if (!isThisTagInArrayAlready) {
							availableTags.push(tag);
						}
					}
				}
			}
		}
		return availableTags;
	}

	function generateLinkAfterDeletionOfTag(tag) {
		const updatedTags = chosenTags.filter((item) => item !== tag);
		let link = "";
		if (updatedTags && updatedTags.length) {
			for (let i = 0; i < updatedTags.length; i++) {
				if (i === 0) {
					link = updatedTags[i];
				} else {
					link = link + "+" + updatedTags[i];
				}
			}
		}
		return link;
	}

	useEffect(() => {
		setAvailableTags(generateAvailableTags(inputedTagValue));
	}, [inputedTagValue]);

	return (
		<div className="tag-search-form">
			<TagSearchFormInput
				defaultValue={inputedTagValue}
				placeholder="type some tag"
				onChange={setInputedTagValue}
			/>
			<div className="tag-search-form-chosen-tags-list">
				{chosenTags && chosenTags.length
					? chosenTags.map((tag) => {
							if (form) {
								return (
									<TagButtonWithTrashIcon
										key={tag}
										tag={tag}
										onTrashIconClick={() => deleteTag(tag)}
									/>
								);
							} else {
								return (
									<TagLinkButtonWithTrashIcon
										key={
											"tag-btn-with-trash-icon-for-" + tag
										}
										tag={tag}
										link={
											"/search?name=" +
											generateLinkAfterDeletionOfTag(tag)
										}
									/>
								);
							}
					  })
					: null}
			</div>

			{/** FOR NOTES SEARCH: */}
			{!form && inputedTagValue ? (
				<TagButtonGeneratedByInput
					tag={inputedTagValue}
					link={
						"/search?name=" +
						(searchLinkFromFilterTags
							? searchLinkFromFilterTags + "+" + inputedTagValue
							: inputedTagValue)
					}
					onClick={() => {
						const link = searchLinkFromFilterTags
							? searchLinkFromFilterTags + "+" + inputedTagValue
							: inputedTagValue;
						setSearchLinkFromFilterTags(link);
						setInputedTagValue("");
					}}
				/>
			) : null}
			{!form && inputedTagValue && availableTags.length
				? availableTags.map((tag, i) => (
						<TagButtonGeneratedByInput
							key={tag}
							tag={tag}
							link={
								"/search?name=" +
								(searchLinkFromFilterTags
									? searchLinkFromFilterTags + "+" + tag
									: tag)
							}
							onClick={() => {
								const link = searchLinkFromFilterTags
									? searchLinkFromFilterTags + "+" + tag
									: tag;
								setSearchLinkFromFilterTags(link);
								setInputedTagValue("");
							}}
						/>
				  ))
				: null}
			{/** FOR FORM SEARCH */}
			{form && inputedTagValue ? (
				<FormTagButton
					tag={inputedTagValue}
					onClick={() => {
						setChosenTags([...chosenTags, inputedTagValue]);
						setInputedTagValue("");
					}}
				/>
			) : null}
			{form && inputedTagValue && availableTags.length
				? availableTags.map((tag, i) => (
						<FormTagButton
							key={tag}
							tag={tag}
							onClick={() => {
								setChosenTags([...chosenTags, tag]);
								setInputedTagValue("");
							}}
						/>
				  ))
				: null}
		</div>
	);
}
