import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../contexts/useTheme";
import signIn from "../auth/signIn";
// react-bootstrap components:
import { Form, Button } from "react-bootstrap";

export default function SignIn() {
	const { theme } = useTheme();
	const navigate = useNavigate();

	const [userSignInData, setUserSignInData] = useState({
		email: "",
		password: "",
	});

	function handleSubmit(e) {
		e.preventDefault();
		if (
			userSignInData.email.replace(/\s/g, "").length &&
			userSignInData.password.replace(/\s/g, "").length
		) {
			signIn(userSignInData).then(() => navigate("/"));
		} else {
			alert(
				"You need to complete all input fields (not only white spaces...) to sign in!"
			);
		}
	}

	return (
		<div
			style={{
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				color: theme === "light" ? "black" : "white",
				maxWidth: 360,
				margin: "auto",
			}}
		>
			<h3 className="text-center mb-3">Sign in</h3>
			<Form
				className="border border-secondary rounded p-3 shadow"
				onSubmit={handleSubmit}
			>
				<Form.Group className="mb-3">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter your email address"
						onChange={(e) =>
							setUserSignInData({
								...userSignInData,
								email: e.target.value,
							})
						}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter your password"
						onChange={(e) =>
							setUserSignInData({
								...userSignInData,
								password: e.target.value,
							})
						}
					/>
					<br />
					<Form.Text>
						Don't have an account? <Link to="/signup">Sign up!</Link>
					</Form.Text>
				</Form.Group>

				<div className="d-grid my-2">
					<Button variant="success" type="submit">
						Sign in
					</Button>
				</div>
			</Form>
		</div>
	);
}
