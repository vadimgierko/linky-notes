import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// react bootstrap components:
import Button from "react-bootstrap/Button";
// custom components:
import IconButton from "../components/IconButton";

export default function Sources() {
	const SOURCES = useSelector((state) => state.sources.value);
	const AUTHORS = useSelector((state) => state.authors.value);
	const navigate = useNavigate();

	return (
		<>
			<h1 className="text-center mb-3">
				Your sources ({Object.keys(SOURCES).length})
			</h1>
			<div className="d-grid my-2">
				<Button
					variant="outline-primary"
					onClick={() => navigate("/add-source")}
				>
					Add source
				</Button>
			</div>
			{Object.keys(SOURCES).length ? (
				<ul>
					{Object.keys(SOURCES).map((key) => (
						<li key={key}>
							<p>
								<strong>
									<em>{SOURCES[key].title}</em>
								</strong>
								, {AUTHORS[SOURCES[key].authorKey].names.full}
								<IconButton
									iconName="pencil"
									color="secondary"
									additionalStyle={{ marginLeft: "1em" }}
									onClick={() => navigate("/sources/update-source/" + key)}
								/>
							</p>
						</li>
					))}
				</ul>
			) : (
				<p>There are no stored sources yet... Add one!</p>
			)}
		</>
	);
}
