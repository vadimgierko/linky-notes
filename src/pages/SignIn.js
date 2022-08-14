import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import signIn from "../auth/signIn";
// react-bootstrap components:
import AuthForm from "../components/AuthForm";

export default function SignIn() {
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
				signIn(userData).then(() => navigate(state.from, { replace: true }));
			} else {
				signIn(userData).then(() => navigate("/", { replace: true }));
			}
		} else {
			alert(
				"You need to complete all input fields (not only white spaces...) to sign in!"
			);
		}
	}

	if (user.id)
		return <Navigate to={state && state.from ? state.from : "/"} replace />;

	return <AuthForm headerText="Sign in" onSubmit={handleSubmit} />;
}
