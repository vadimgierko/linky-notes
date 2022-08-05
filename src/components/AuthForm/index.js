import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/useTheme";
// react-bootstrap components:
import { Form, Button } from "react-bootstrap";

export default function AuthForm({ headerText, onSubmit }) {
	const { theme } = useTheme();

	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});

	return (
		<div
			style={{
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				color: theme === "light" ? "black" : "white",
				maxWidth: 360,
				margin: "auto",
			}}
		>
			<h1 className="text-center mb-3">{headerText}</h1>
			<Form
				className="border border-secondary rounded p-3 shadow"
				onSubmit={(e) => onSubmit(e, userData)}
			>
				<Form.Group className="mb-3">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter your email address"
						onChange={(e) =>
							setUserData({
								...userData,
								email: e.target.value,
							})
						}
					/>
					{headerText === "Sign up" && (
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					)}
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter your password"
						onChange={(e) =>
							setUserData({
								...userData,
								password: e.target.value,
							})
						}
					/>
					<br />
					{headerText === "Sign in" ? (
						<Form.Text>
							Don't have an account? <Link to="/signup">Sign up!</Link>
						</Form.Text>
					) : (
						<Form.Text>
							Already have an account? <Link to="/signin">Sign in!</Link>
						</Form.Text>
					)}
				</Form.Group>

				<div className="d-grid my-2">
					<Button variant="success" type="submit">
						{headerText}
					</Button>
				</div>
			</Form>
		</div>
	);
}
