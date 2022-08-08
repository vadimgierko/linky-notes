import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import signIn from "../auth/signIn";
// react-bootstrap components:
import AuthForm from "../components/AuthForm";

export default function SignIn() {
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";
	const user = useSelector((state) => state.user.value);

	// only to check:
	useEffect(() => console.log("from from location in SignIn:", from), [from]);

	function handleSubmit(e, userData) {
		e.preventDefault();
		if (
			userData.email.replace(/\s/g, "").length &&
			userData.password.replace(/\s/g, "").length
		) {
			signIn(userData).then(() => navigate(from, { replace: true }));
		} else {
			alert(
				"You need to complete all input fields (not only white spaces...) to sign in!"
			);
		}
	}

	if (user.id) return <Navigate to={from} replace />;

	return <AuthForm headerText="Sign in" onSubmit={handleSubmit} />;
}
