import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/useTheme";
import signIn from "../../auth/signIn";
// react-bootstrap components:
import { Form, Button } from "react-bootstrap";

export default function SignIn() {
	const { theme } = useTheme();
	const navigate = useNavigate();

	const [userSignInData, setUserSignInData] = useState({
		email: "",
		password: "",
	});

	function handleSubmit() {
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
			}}
		>
			<h3 className="text-center mb-3">Sign in</h3>
			<Form
				className="border rounded p-3 shadow col-md-6 mx-auto"
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
							setUserSignInData({
								...userSignInData,
								password: e.target.value,
							})
						}
					/>
				</Form.Group>

				<div className="d-grid">
					<Button variant="success" type="submit">
						Sign in
					</Button>
				</div>
			</Form>
		</div>
	);
}
