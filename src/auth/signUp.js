import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default async function signUp(userData) {
	try {
		const userCredential = await createUserWithEmailAndPassword(
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
