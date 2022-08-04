import { rtdb } from "../firebaseConfig";
import { ref, set } from "firebase/database";
import generateFirebaseKeyFor from "./generateFirebaseKeyFor";

export default async function addItem(reference, item) {
	try {
		const key = generateFirebaseKeyFor(reference);
		const refUpdatedWithTheKey = reference + "/" + key;
		await set(ref(rtdb, refUpdatedWithTheKey), item);
		console.log("Item was successfully added to", refUpdatedWithTheKey);
		// return item's key, because it's needed in addItemWithAutoKey() thunk:
		return key;
	} catch (error) {
		return alert(error.message);
	}
}
