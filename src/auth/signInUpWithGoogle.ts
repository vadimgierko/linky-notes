import { auth } from "@/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default async function signInUpWithGoogle() {
	try {
		const provider = new GoogleAuthProvider();
		// This gives you a Google Access Token. You can use it to access the Google API.
		// const credential = GoogleAuthProvider.credentialFromResult(result);
		// const token = credential?.accessToken;
		const userCredential = await signInWithPopup(auth, provider);
		// Signed in
		const user = userCredential.user;
		console.log("User signed in:", user);
	} catch (error: unknown) {
		console.error(error);
		alert(error);
	}
}
