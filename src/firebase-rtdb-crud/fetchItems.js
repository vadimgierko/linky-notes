import { rtdb } from "../firebaseConfig";
import { ref, get } from "firebase/database";

export default async function fetchItems(reference) {
	try {
		const snapshot = await get(ref(rtdb, reference));
		if (snapshot.exists()) {
			const data = snapshot.val();
			console.log("DATA WAS FETCHED: ALL USER'S ITEMS FROM", reference);
			console.log("fetchedItems:", data);
			return data;
		} else {
			console.log("There are no items at", reference);
			return null;
		}
	} catch (error) {
		return alert(error.message);
	}
}
