import { Link } from "react-router-dom";

export default function generateSourceReferenceString(source, authors) {
	if (!source) return null;
	const neededSourceData = {
		title: source.title,
		authorKey: source.authorKey,
		placeOfPublishing: source.placeOfPublishing,
		yearOfPublishing: source.yearOfPublishing,
		link: source.link,
	};
	let reference = "";
	Object.keys(neededSourceData).forEach((key) => {
		if (neededSourceData[key]) {
			if (!reference) {
				if (
					key === "authorKey" &&
					Object.keys(authors) &&
					authors[neededSourceData.authorKey]
				) {
					reference += authors[neededSourceData.authorKey].names.full;
				} else {
					reference += neededSourceData[key];
				}
			} else {
				if (
					key === "authorKey" &&
					Object.keys(authors) &&
					authors[neededSourceData.authorKey]
				) {
					reference += ", " + authors[neededSourceData.authorKey].names.full;
				} else {
					reference += ", " + neededSourceData[key];
				}
			}
		}
	});
	return reference;
}
