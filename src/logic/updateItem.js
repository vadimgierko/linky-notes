import { database } from "../firebaseConfig.js";
import { ref, set } from "firebase/database";
import { createDate } from "../functions/functions";

//===================================== IMPORTANT !!!
// check if there are new tags
// if true => add new tags first
// then add item
// + combine existingTags & newTags !!! &&

// + remember, that updatedItem consists tags, existingTags & newTags => need to reduce

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
