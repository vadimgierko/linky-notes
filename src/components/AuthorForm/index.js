import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "../../contexts/useTheme";
// react-bootstrap components:
import { Form, Button } from "react-bootstrap";
// helper functions:
import capitalizeString from "../../helper-functions/capitalizeString";

export default function AuthorForm({
	authorKey,
	onSubmit = (f) => f,
	onCancel = (f) => f,
}) {
	const { theme } = useTheme();
	const AUTHORS = useSelector((state) => state.authors.value);
	const [author, setAuthor] = useState();

	useEffect(() => {
		if (authorKey) {
			if (Object.keys(AUTHORS).length) {
				// if authorKey was passed,
				// it means that we are updating the existing author,
				// so we need to fetch it from the store:
				//setAuthor(AUTHORS[authorKey]);
				setAuthor({
					...AUTHORS[authorKey],
					names: {
						first: AUTHORS[authorKey].names.first,
						middle: AUTHORS[authorKey].names.middle,
						last: AUTHORS[authorKey].names.last,
					},
				});
			}
		} else {
			setAuthor({
				names: {
					first: "",
					middle: "",
					last: "",
				},
			});
		}
	}, [authorKey, AUTHORS]);

	if (!author) return null;

	return (
		<div
			style={{
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				color: theme === "light" ? "black" : "white",
			}}
		>
			<h1 className="text-center mb-3">
				{authorKey ? "Update Author!" : "Add Author!"}
			</h1>
			<Form
				className="border border-secondary rounded p-3 shadow"
				onSubmit={(e) => {
					if (author.names.last.length) {
						onSubmit(e, author);
					} else {
						e.preventDefault();
						alert(
							"Can not add/update author, because there is no author's last name provided. Add at least author's last name."
						);
					}
				}}
			>
				{Object.keys(author.names)
					.filter((name) => (authorKey ? name !== "full" : true))
					.map((name) => (
						<Form.Group key={name + "-name-form-group"} className="mb-3">
							<Form.Label>{capitalizeString(name)} name:</Form.Label>
							<Form.Control
								placeholder={"Input author's " + name + " name"}
								value={author.names[name]}
								style={{
									backgroundColor:
										theme === "light" ? "white" : "rgb(13, 17, 23)",
									color: theme === "light" ? "black" : "white",
								}}
								onChange={(e) =>
									setAuthor({
										...author,
										names: { ...author.names, [name]: e.target.value },
									})
								}
							/>
						</Form.Group>
					))}

				<div className="d-grid my-2">
					<Button className="mb-3" variant="success" type="submit">
						{authorKey ? "Update author" : "Add author"}
					</Button>
					<Button
						className="mb-3"
						variant="secondary"
						onClick={() => {
							setAuthor({
								names: {
									first: "",
									middle: "",
									last: "",
								},
							});
							onCancel();
						}}
					>
						Cancel
					</Button>
				</div>
			</Form>
		</div>
	);
}
