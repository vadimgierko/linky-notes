import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import signUp from "../auth/signUp";
// react-bootstrap components:
import AuthForm from "../components/AuthForm";

export default function SignUp() {
	const navigate = useNavigate();
	const { state } = useLocation();
	const user = useSelector((state) => state.user.value);

	function handleSubmit(e, userData) {
		e.preventDefault();

		if (
			userData.email.replace(/\s/g, "").length &&
			userData.password.replace(/\s/g, "").length
		) {
			if (state && state.from) {
				signUp(userData).then(() => navigate(state.from, { replace: true }));
			} else {
				signUp(userData).then(() => navigate("/", { replace: true }));
			}
		} else {
			alert(
				"You need to complete all input fields (not only white spaces...) to create an account!"
			);
		}
	}

	if (user.id)
		return (
			<Navigate to={state && state.from ? state.from : "/about"} replace />
		);

	return <AuthForm headerText="Sign up" onSubmit={handleSubmit} />;
}
