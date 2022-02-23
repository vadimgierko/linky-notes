import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/use-theme";
import signIn from "../../logic/signIn";

export default function SignIn() {
	const { theme } = useTheme();

	const [userSignInData, setUserSignInData] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = (signUpData) => {
		if (
			signUpData.email.replace(/\s/g, "").length &&
			signUpData.password.replace(/\s/g, "").length
		) {
			signIn(signUpData);
		} else {
			alert(
				"You need to complete all input fields (not only white spaces...) to sign in!"
			);
		}
	};

	return (
		<div style={{ background: theme.background, color: theme.color }}>
			<h3>Sign in!</h3>
			<hr />
			<form>
				<input
					className="form-control mb-2"
					type="email"
					placeholder="email"
					onChange={(e) =>
						setUserSignInData({
							...userSignInData,
							email: e.target.value,
						})
					}
				/>
				<input
					className="form-control mb-2"
					type="password"
					placeholder="password"
					onChange={(e) =>
						setUserSignInData({
							...userSignInData,
							password: e.target.value,
						})
					}
				/>
			</form>
			<Link
				to="/" // => "/items"
				type="button"
				className="btn btn-secondary mb-2"
				onClick={() =>
					handleSubmit({
						email: userSignInData.email,
						password: userSignInData.password,
					})
				}
			>
				Sign in
			</Link>
		</div>
	);
}
