import { useSelector } from "react-redux";
import { useTheme } from "../contexts/useTheme";
import { useNavigate } from "react-router-dom";
// react bootstrap components:
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
// custom components:
import IconButton from "../components/IconButton";

export default function Authors() {
	const { theme } = useTheme();
	const user = useSelector((state) => state.user.value);
	const AUTHORS = useSelector((state) => state.authors.value);
	const navigate = useNavigate();

	if (!user.id)
		return (
			<div
				className="authors-page"
				style={{
					backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
					color: theme === "light" ? "black" : "white",
				}}
			>
				<p>You need to be logged in to see stored authors...</p>
			</div>
		);

	return (
		<div
			className="authors-page"
			style={{
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				color: theme === "light" ? "black" : "white",
			}}
		>
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
		</div>
	);
}