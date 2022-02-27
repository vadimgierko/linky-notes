import { database } from "../firebaseConfig.js";
import { ref, set } from "firebase/database";
import { createDate } from "../functions/functions";

function updateItemInDatabase(item, key, userId) {
	return set(ref(database, "items/" + userId + "/" + key), {
		...item,
	}).then(() =>
		console.log("Item was updated in database under the key,", key)
	);
}

export default function updateItem(item, key, userId, dispatch) {
	const updatedAt = createDate();

	const itemWithDate = {
		...item,
		updatedAt: updatedAt,
	};

	return updateItemInDatabase(itemWithDate, key, userId)
		.then(() => {
			console.log("Item with the key", key, "was updated successfully!");
			dispatch({
				type: "add-fetched-item-to-fetched-items",
				payload: { key: key, item: itemWithDate },
			});
		})
		.catch((error) => alert(error.message));
}
