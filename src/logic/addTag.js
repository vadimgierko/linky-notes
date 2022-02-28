import { database } from "../firebaseConfig.js";
import { ref, set, push, child } from "firebase/database";

function addTagToDatabase(tag, userId, key) {
	return set(ref(database, "tags/" + userId + "/" + key), {
		tag: tag,
	}).then(() =>
		console.log("Tag", tag, "was added to database under the key,", key)
	);
}

export default function addTag(tag, userId, dispatch) {
	const key = push(child(ref(database), "tags/" + userId)).key;

	return addTagToDatabase(tag, userId, key)
		.then(() => {
			console.log("Tag was added successfully!");
			dispatch({
				type: "add-tag-to-fetched-tags",
				payload: { key: key, tag: tag },
			});
		})
		.catch((error) => alert(error.message));
}
