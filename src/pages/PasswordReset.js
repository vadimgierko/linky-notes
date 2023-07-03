import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useTheme } from "../contexts/useTheme";
import { auth } from "../firebaseConfig";
// import useUser from "../../context/useUser";
import { sendPasswordResetEmail } from "firebase/auth";
import { useSelector } from "react-redux";

export default function PasswordReset() {
	const { theme } = useTheme();
	const user = useSelector((state) => state.user.value);
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		if (email) {
			try {
				await sendPasswordResetEmail(auth, email);
				alert(
					"Password reset email was sent! Check your email and try to sign in again with reset password!"
				);
				navigate("/signin");
			} catch (error) {
				console.error(error.message);
			}
		} else {
			return console.error(
				"No email address was provided... Cannot send password reset email..."
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
			<h1 className="text-center mb-3">Reset your password!</h1>

			<Form
				className="border border-secondary rounded p-3 shadow"
				onSubmit={handleSubmit}
			>
				<Form.Group className="mb-3">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter your email address"
						required
						onChange={(e) => setEmail(e.target.value)}
						style={{
							backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
							color: theme === "light" ? "black" : "white",
						}}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Text>
						Don't have an account? <Link to="/signup">Sign up!</Link>
					</Form.Text>
				</Form.Group>

				<div className="d-grid mb-2">
					<Button variant="success" type="submit">
						Send password reset email
					</Button>
				</div>
			</Form>
		</div>
	);
}
