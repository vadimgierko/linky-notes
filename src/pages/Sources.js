// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// // react bootstrap components:
// import Button from "react-bootstrap/Button";
// // custom components:
// import IconButton from "../components/IconButton";
// import SourceReferenceString from "../components/SourceReferenceString";

// export default function Sources() {
// 	const navigate = useNavigate();
// 	const SOURCES = useSelector((state) => state.sources.value);
// 	const AUTHORS = useSelector((state) => state.authors.value);
// 	const [sortedSources, setSortedSources] = useState({});
// 	const [sourcesWithoutTitle, setSourcesWithoutTitle] = useState({});

// 	useEffect(() => {
// 		if (Object.keys(SOURCES).length) {
// 			let sortedTitles = [];
// 			let withoutTitle = {};
// 			Object.keys(SOURCES).forEach((key) =>
// 				SOURCES[key].title
// 					? sortedTitles.push(SOURCES[key].title)
// 					: (withoutTitle = { ...withoutTitle, [key]: SOURCES[key] })
// 			);
// 			sortedTitles.sort();
// 			let sortedSourcesObjects = {};
// 			sortedTitles.forEach((title) =>
// 				Object.keys(SOURCES).forEach((key) =>
// 					SOURCES[key].title === title
// 						? (sortedSourcesObjects = {
// 								...sortedSourcesObjects,
// 								[key]: SOURCES[key],
// 						  })
// 						: null
// 				)
// 			);
// 			setSortedSources(sortedSourcesObjects);
// 			setSourcesWithoutTitle(withoutTitle);
// 		}
// 	}, [SOURCES]);

// 	return (
// 		<>
// 			<h1 className="text-center mb-3">
// 				Your sources ({Object.keys(SOURCES).length})
// 			</h1>
// 			<div className="d-grid my-2">
// 				<Button
// 					variant="outline-primary"
// 					onClick={() => navigate("/add-source")}
// 				>
// 					Add source
// 				</Button>
// 			</div>
// 			{Object.keys(SOURCES).length ? (
// 				<>
// 					{Object.keys(sortedSources).length ? (
// 						<>
// 							<h5 className="text-center">
// 								Sources with title sorted alphabetically:
// 							</h5>
// 							<hr />
// 							<ul>
// 								{Object.keys(sortedSources).map((key) => (
// 									<li key={key}>
// 										<p>
// 											<SourceReferenceString source={sortedSources[key]} />
// 											<IconButton
// 												iconName="pencil"
// 												color="secondary"
// 												additionalStyle={{ marginLeft: "1em" }}
// 												onClick={() =>
// 													navigate("/sources/update-source/" + key)
// 												}
// 											/>
// 										</p>
// 									</li>
// 								))}
// 							</ul>
// 						</>
// 					) : null}
// 					{Object.keys(sourcesWithoutTitle).length ? (
// 						<>
// 							<hr />
// 							<h5 className="text-center">
// 								Sources without title (not sorted):
// 							</h5>
// 							<hr />
// 							<ul>
// 								{Object.keys(sourcesWithoutTitle).map((key) => (
// 									<li key={key}>
// 										<p>
// 											<SourceReferenceString
// 												source={sourcesWithoutTitle[key]}
// 											/>
// 											<IconButton
// 												iconName="pencil"
// 												color="secondary"
// 												additionalStyle={{ marginLeft: "1em" }}
// 												onClick={() =>
// 													navigate("/sources/update-source/" + key)
// 												}
// 											/>
// 										</p>
// 									</li>
// 								))}
// 							</ul>
// 						</>
// 					) : null}
// 				</>
// 			) : (
// 				<p>There are no stored sources yet... Add one!</p>
// 			)}
// 		</>
// 	);
// }
