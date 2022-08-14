import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function SourceReferenceString({ source, pages }) {
	const AUTHORS = useSelector((state) => state.authors.value);
	const [neededSourceData, setNeededSourceData] = useState();
	const [validatedSource, setValidatedSource] = useState();

	useEffect(() => {
		if (source) {
			setNeededSourceData({
				title: source.title,
				authorKey: source.authorKey,
				placeOfPublishing: source.placeOfPublishing,
				yearOfPublishing: source.yearOfPublishing,
				link: source.link,
			});
		}
	}, [source]);

	useEffect(() => {
		if (neededSourceData) {
			let item = {};
			Object.keys(neededSourceData).forEach((key) =>
				neededSourceData[key]
					? (item = { ...item, [key]: neededSourceData[key] })
					: null
			);
			setValidatedSource(item);
		}
	}, [neededSourceData]);

	if (!validatedSource) return null;

	return (
		<>
			{Object.keys(validatedSource).map((key, i) => (
				<span key={key}>
					{key === "title" ? (
						<strong>
							<em>{validatedSource.title}</em>
						</strong>
					) : key === "authorKey" ? (
						AUTHORS[validatedSource.authorKey].names.full
					) : key === "link" ? (
						<a href={validatedSource.link} target="_blank">
							{validatedSource.link}
						</a>
					) : (
						validatedSource[key]
					)}
					{i < Object.keys(validatedSource).length - 1 ? ", " : null}
				</span>
			))}
			{pages && <span>, {pages}</span>}
		</>
	);
}
