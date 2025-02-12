import { Tags, Tag } from "@/types";

export default function sortTagsAlphabetically(tags: Tags) {
	/**
	 * Converted Tags into `{[key: TAG_VALUE!]: Tag}`
	 * to be able to sort by tag values later:
	 */
	const tagsValuesObject = Object.values(tags).reduce(
		(prev, curr) => ({ ...prev, [curr.value]: curr }),
		{} as { [key: string]: Tag }
	);

	const tagsValuesSortedAlphabetically =
		Object.keys(tagsValuesObject).toSorted();

	const tagsSortedAlphabetically = tagsValuesSortedAlphabetically
		.map((value) => tagsValuesObject[value])
		.filter((t) => t !== null) as Tag[];

	return tagsSortedAlphabetically;
}
