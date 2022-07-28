import { rtdb } from "../firebaseConfig.js";
import { ref, remove } from "firebase/database";

function deleteItemFromDatabase(key, userId) {
	return remove(ref(rtdb, "items/" + userId + "/" + key)).then(() =>
		console.log("Item with the key,", key, " was deleted from database.")
	);
}

export default function deleteItem(key, userId, dispatch) {
	return (
		deleteItemFromDatabase(key, userId)
			//.then(() => deleteItemFromUsersItemsList(key, userId))
			.then(() => {
				console.log("Item with the key", key, "was deleted successfully!");
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
