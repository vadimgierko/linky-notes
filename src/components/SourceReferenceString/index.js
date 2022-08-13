import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
			console.log("validated source:", item);
		}
	}, [neededSourceData]);

	if (!validatedSource) return null;

	return (
		<>
			{Object.keys(validatedSource).map((key, i) =>
				key === "title" ? (
					<span key={key}>
						<strong>
							<em>{validatedSource.title}</em>
						</strong>
					</span>
				) : key === "authorKey" ? (
					<span key={key}>
						{i > 0 ? <span>, </span> : null}
						{i && <span>, </span>}
						{AUTHORS[validatedSource.authorKey].names.full}
					</span>
				) : key === "link" ? (
					<span key={key}>
						{i > 0 ? <span>, </span> : null}
						<Link to={validatedSource.link} target="_blank">
							{validatedSource.link}
						</Link>
					</span>
				) : (
					<span key={key}>
						{i > 0 ? <span>, </span> : null}
						{validatedSource[key]}
					</span>
				)
			)}
			{pages && <span>, {pages}</span>}
		</>
	);
}
