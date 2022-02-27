import { database } from "../firebaseConfig.js";
import { ref, remove } from "firebase/database";

function deleteItemFromDatabase(key, userId) {
	return remove(ref(database, "items/" + userId + "/" + key)).then(() =>
		console.log("Item with the key,", key, " was deleted from database.")
	);
}

// function deleteItemFromUsersItemsList(key, userId) {
// 	return remove(ref(database, "users/" + userId + "/itemsList/" + key)).then(
// 		() =>
// 			console.log(
// 				"Item with the key,",
// 				key,
// 				" was deleted from user's items list."
// 			)
// 	);
// }

// compose all functions in addItem function
export default function deleteItem(key, userId, dispatch) {
	return (
		deleteItemFromDatabase(key, userId)
			//.then(() => deleteItemFromUsersItemsList(key, userId))
			.then(() => {
				console.log(
					"Item with the key",
					key,
					"was deleted successfully!"
				);
				dispatch({
					type: "delete-item",
					payload: {
						key: key,
					},
				});
			})
			.catch((error) => alert(error.message))
	);
}
