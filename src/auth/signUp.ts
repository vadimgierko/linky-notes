import { UserData } from "@/components/AuthForm";
import { auth } from "@/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default async function signUp(userData: UserData) {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			userData.email,
			userData.password
		);
		// Signed in
		const user = userCredential.user;
		console.log(user);
	} catch (error: unknown) {
		alert(error);
	}
}
