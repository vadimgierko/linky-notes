import { database } from "../firebaseConfig.js";
import { ref, set, push, child } from "firebase/database";

function addItemToDatabase(item, userId, key) {
	return set(ref(database, "items/" + userId + "/" + key), {
		...item,
	}).then(() =>
		console.log("Item was added to database under the key,", key)
	);
}

function addItemToUserItemsList(itemTitle, key, userId) {
	return set(ref(database, "users/" + userId + "/itemsList/" + key), {
		title: itemTitle,
	}).then(() =>
		console.log("Item was added into user items list under the key,", key)
	);
}

// compose all functions in addItem function
export default function addItem(item, userId, dispatch) {
	const createdAt = new Date().toDateString();

	const itemWithDate = {
		title: item.title,
		description: item.description,
		content: item.content,
		createdAt: createdAt,
		userId: userId,
	};

	const key = push(child(ref(database), "items/" + userId)).key;

	return addItemToDatabase(itemWithDate, userId, key)
		.then(() =>
			addItemToUserItemsList(itemWithDate.title, key, itemWithDate.userId)
		)
		.then(() => {
			console.log("Item was added successfully!");
			dispatch({
				type: "add-item",
				payload: { key: key, item: itemWithDate },
			});
			dispatch({
				type: "add-fetched-item-to-fetched-items",
				payload: { key: key, item: itemWithDate },
			});
		})
		.catch((error) => alert(error.message));
}
