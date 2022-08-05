import { useNavigate } from "react-router-dom";
import signIn from "../auth/signIn";
// react-bootstrap components:
import AuthForm from "../components/AuthForm";

export default function SignIn() {
	const navigate = useNavigate();

	function handleSubmit(e, userData) {
		e.preventDefault();
		if (
			userData.email.replace(/\s/g, "").length &&
			userData.password.replace(/\s/g, "").length
		) {
			signIn(userData).then(() => navigate("/"));
		} else {
			alert(
				"You need to complete all input fields (not only white spaces...) to sign in!"
			);
		}
	}

	return <AuthForm headerText="Sign in" onSubmit={handleSubmit} />;
}
