import { rtdb } from "../firebaseConfig.js";
import { ref, set, push, child } from "firebase/database";

function addTagToDatabase(tag, userId, key) {
	return set(ref(rtdb, "tags/" + userId + "/" + key), {
		tag: tag,
	}).then(() =>
		console.log("Tag", tag, "was added to database under the key,", key)
	);
}

// the firebase key for tag will be generated in add/updateItem()
export default function addTag(tag, key, userId, dispatch) {
	return addTagToDatabase(tag, userId, key)
		.then(() => {
			console.log("Tag was added successfully!");
			dispatch({
				type: "add-tag",
				payload: { key: key, tag: tag },
			});
		})
		.catch((error) => alert(error.message));
}
