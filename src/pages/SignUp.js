import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import signUp from "../auth/signUp";
// react-bootstrap components:
import AuthForm from "../components/AuthForm";

export default function SignUp() {
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	// only to check:
	useEffect(() => console.log("from from location in SignUp:", from), [from]);

	function handleSubmit(e, userData) {
		e.preventDefault();

		if (
			userData.email.replace(/\s/g, "").length &&
			userData.password.replace(/\s/g, "").length
		) {
			signUp(userData).then(() => navigate(from, { replace: true }));
		} else {
			alert(
				"You need to complete all input fields (not only white spaces...) to create an account!"
			);
		}
	}

	return <AuthForm headerText="Sign up" onSubmit={handleSubmit} />;
}
