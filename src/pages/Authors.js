import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// react bootstrap components:
import Button from "react-bootstrap/Button";
// custom components:
import IconButton from "../components/IconButton";

export default function Authors() {
	const AUTHORS = useSelector((state) => state.authors.value);
	const navigate = useNavigate();
	const [sortedAuthors, setSortedAuthors] = useState({});

	useEffect(() => {
		if (Object.keys(AUTHORS).length) {
			let sortedLastNames = [];
			Object.keys(AUTHORS).forEach((key) =>
				sortedLastNames.push(AUTHORS[key].names.last)
			);
			sortedLastNames.sort();
			let sortedAuthorsObjects = {};
			sortedLastNames.forEach((lastName) =>
				Object.keys(AUTHORS).forEach((key) =>
					AUTHORS[key].names.last === lastName
						? (sortedAuthorsObjects = {
								...sortedAuthorsObjects,
								[key]: AUTHORS[key],
						  })
						: null
				)
			);
			setSortedAuthors(sortedAuthorsObjects);
		}
	}, [AUTHORS]);

	return (
		<>
			<h1 className="text-center mb-3">
				Your authors ({Object.keys(sortedAuthors).length})
			</h1>
			<div className="d-grid my-2">
				<Button
					variant="outline-primary"
					onClick={() => navigate("/add-author")}
				>
					Add author
				</Button>
			</div>
			{Object.keys(sortedAuthors).length ? (
				<ul>
					{Object.keys(sortedAuthors).map((key) => (
						<li key={key}>
							{sortedAuthors[key].names.full}
							<IconButton
								iconName="pencil"
								color="secondary"
								additionalStyle={{ marginLeft: "1em" }}
								onClick={() => navigate("/authors/update-author/" + key)}
							/>
						</li>
					))}
				</ul>
			) : (
				<p>There are no stored authors yet... Add one!</p>
			)}
		</>
	);
}
