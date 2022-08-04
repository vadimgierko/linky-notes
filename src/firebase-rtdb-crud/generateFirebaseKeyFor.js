import { rtdb } from "../firebaseConfig";
import { ref, push, child } from "firebase/database";

// generate Firebase unique key for the item:
export default function generateFirebaseKeyFor(reference) {
	const firebaseKey = push(child(ref(rtdb), reference)).key;

	return firebaseKey;
}
