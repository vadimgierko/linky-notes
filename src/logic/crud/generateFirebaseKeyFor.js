import { database } from "../../firebaseConfig";
import { ref, push, child } from "firebase/database";

export default function generateFirebaseKeyFor(
	itemCategoryNameInThePlural,
	userId
) {
	const firebaseKey = push(
		child(ref(database), itemCategoryNameInThePlural + "/" + userId)
	).key;

	return firebaseKey;
}
