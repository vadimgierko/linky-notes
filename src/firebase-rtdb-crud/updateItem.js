import { rtdb } from "../firebaseConfig";
import { ref, set } from "firebase/database";

export default async function updateItem(reference, item) {
	try {
		await set(ref(rtdb, reference), item);
		//console.log("Item was successfully updated at", reference);
	} catch (error) {
		return alert(error.message);
	}
}
