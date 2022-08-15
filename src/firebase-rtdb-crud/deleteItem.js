import { rtdb } from "../firebaseConfig";
import { ref, remove } from "firebase/database";

export default async function deleteItem(reference) {
	try {
		await remove(ref(rtdb, reference));
		//console.log("Item was successfully deleted from", reference);
	} catch (error) {
		return alert(error.message);
	}
}
