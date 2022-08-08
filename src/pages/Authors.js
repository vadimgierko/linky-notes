import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// react bootstrap components:
import Button from "react-bootstrap/Button";
// custom components:
import IconButton from "../components/IconButton";

export default function Authors() {
	const AUTHORS = useSelector((state) => state.authors.value);
	const navigate = useNavigate();

	return (
		<>
			<h1 className="text-center mb-3">
				Your authors ({Object.keys(AUTHORS).length})
			</h1>
			<div className="d-grid my-2">
				<Button
					variant="outline-primary"
					onClick={() => navigate("/add-author")}
				>
					Add author
				</Button>
			</div>
			{Object.keys(AUTHORS).length ? (
				<ul>
					{Object.keys(AUTHORS).map((key) => (
						<li key={key}>
							{AUTHORS[key].names.full}
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
