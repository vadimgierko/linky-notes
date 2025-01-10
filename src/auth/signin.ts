import { UserData } from "@/components/AuthForm";
import { auth } from "@/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function signIn(userData: UserData) {
	try {
		const userCredential = await signInWithEmailAndPassword(
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
