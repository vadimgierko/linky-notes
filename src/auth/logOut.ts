import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";

export default async function logOut() {
	try {
		return await signOut(auth);
	} catch (error: unknown) {
		return alert(error);
	}
}
