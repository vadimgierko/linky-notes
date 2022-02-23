import { firebaseAuth } from "../firebaseConfig.js";

import { signOut } from "firebase/auth";

export default function logOut() {
	return signOut(firebaseAuth).catch((error) => {
		alert(error.message);
	});
}
