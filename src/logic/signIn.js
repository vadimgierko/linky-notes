import { firebaseAuth } from "../firebaseConfig.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function signIn(signInData) {
	const email = signInData.email;
	const password = signInData.password;
	return signInWithEmailAndPassword(firebaseAuth, email, password).catch(
		(error) => {
			alert(error.message);
		}
	);
}
