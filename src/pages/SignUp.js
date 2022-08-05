import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../contexts/useTheme";
import signUp from "../auth/signUp";
// react-bootstrap components:
import { Form, Button } from "react-bootstrap";

export default function SignUp() {
	const { theme } = useTheme();
	const navigate = useNavigate();

	const [userSignUpData, setUserSignUpData] = useState({
		email: "",
		password: "",
	});

	function handleSubmit(e) {
		e.preventDefault();

		if (
			userSignUpData.email.replace(/\s/g, "").length &&
			userSignUpData.password.replace(/\s/g, "").length
		) {
			signUp(userSignUpData).then(() => navigate("/"));
		} else {
			alert(
				"You need to complete all input fields (not only white spaces...) to create an account!"
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
			<h3 className="text-center mb-3">Sign up!</h3>
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
							setUserSignUpData({
								...userSignUpData,
								email: e.target.value,
							})
						}
					/>
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter your password"
						onChange={(e) =>
							setUserSignUpData({
								...userSignUpData,
								password: e.target.value,
							})
						}
					/>
					<br />
					<Form.Text>
						Already have an account? <Link to="/signin">Sign in!</Link>
					</Form.Text>
				</Form.Group>

				<div className="d-grid my-2">
					<Button variant="success" type="submit">
						Sign up
					</Button>
				</div>
			</Form>
		</div>
	);
}
