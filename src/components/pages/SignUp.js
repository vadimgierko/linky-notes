import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/use-theme";
import signUp from "../../auth/signUp";

export default function SignUp() {
	const { theme } = useTheme();

	const [userSignUpData, setUserSignUpData] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = (signUpData) => {
		if (
			signUpData.email.replace(/\s/g, "").length &&
			signUpData.password.replace(/\s/g, "").length
		) {
			signUp(signUpData);
		} else {
			alert(
				"You need to complete all input fields (not only white spaces...) to create an account!"
			);
		}
	};

	return (
		<div style={{ background: theme.background, color: theme.color }}>
			<h3>Sign up!</h3>
			<hr />
			<form>
				<input
					className="form-control mb-2"
					type="email"
					placeholder="email"
					onChange={(e) =>
						setUserSignUpData({
							...userSignUpData,
							email: e.target.value,
						})
					}
				/>
				<input
					className="form-control mb-2"
					type="password"
					placeholder="password"
					onChange={(e) =>
						setUserSignUpData({
							...userSignUpData,
							password: e.target.value,
						})
					}
				/>
			</form>
			<Link
				to="/"
				type="button"
				className="btn btn-secondary mb-2"
				onClick={() =>
					handleSubmit({
						email: userSignUpData.email,
						password: userSignUpData.password,
					})
				}
			>
				Sign up
			</Link>
		</div>
	);
}
