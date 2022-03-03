import { database } from "../firebaseConfig.js";
import { ref, set, push, child } from "firebase/database";
import { createDate } from "../functions/functions";

function addItemToDatabase(item, userId, key) {
	return set(ref(database, "items/" + userId + "/" + key), {
		...item,
	}).then(() =>
		console.log("Item was added to database under the key,", key)
	);
}

export default function addItem(item, userId, dispatch) {
	const createdAt = createDate();

	const itemWithDate = {
		...item,
		createdAt: createdAt,
		userId: userId,
	};

	const key = push(child(ref(database), "items/" + userId)).key;

	return addItemToDatabase(itemWithDate, userId, key)
		.then(() => {
			console.log("Item was added successfully!");
			dispatch({
				type: "add-fetched-item-to-fetched-items",
				payload: { key: key, item: itemWithDate },
			});
		})
		.catch((error) => alert(error.message));
}
