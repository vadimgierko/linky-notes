import { firebaseAuth } from "../firebaseConfig.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function signUp(signUpData) {
	return createUserWithEmailAndPassword(
		firebaseAuth,
		signUpData.email,
		signUpData.password
	)
		.then((userCredential) => {
			console.log(
				"user is sign up. userCredential.user: ",
				userCredential.user
			);
		})
		.catch((error) => {
			alert(error.message);
		});
}
