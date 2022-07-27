import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function signIn(userData) {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			userData.email,
			userData.password
		);
		// Signed in
		const user = userCredential.user;
		console.log(user);
	} catch (error) {
		alert(error.message);
	}
}
