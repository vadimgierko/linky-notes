import { rtdb } from "../firebaseConfig";
import { ref, set } from "firebase/database";

export default async function addItemWithGivenKey(reference, item) {
	try {
		await set(ref(rtdb, reference), item);
		console.log("Item was successfully added to", reference);
	} catch (error) {
		return alert(error.message);
	}
}
