// import { rtdb } from "../firebaseConfig.js";
// import { ref, set, push, child } from "firebase/database";
// import { createDate } from "../functions/functions";
// import addTag from "./addTag.js";

// function updateItemInDatabase(item, key, userId) {
// 	return set(ref(rtdb, "items/" + userId + "/" + key), {
// 		...item,
// 	}).then(() =>
// 		console.log("Item was updated in database under the key,", key)
// 	);
// }

// export default function updateItem(item, key, userId, dispatch) {
// 	const updatedAt = createDate();

// 	let updatedItem = {
// 		...item,
// 		updatedAt: updatedAt,
// 	};

// 	// delete tags object, because existingTags consists it already:
// 	delete updatedItem.tags;

// 	// add new tags if exist & append them to itemToAdd.tags object
// 	if (updatedItem.newTags && updatedItem.newTags.length) {
// 		updatedItem.newTags.forEach((newTag) => {
// 			const firebaseKey = push(child(ref(rtdb), "tags/" + userId)).key;

// 			addTag(newTag, firebaseKey, userId, dispatch);

// 			updatedItem = {
// 				...updatedItem,
// 				tags: {
// 					...updatedItem.tags,
// 					[firebaseKey]: {
// 						tag: newTag,
// 					},
// 				},
// 			};
// 		});
// 	}

// 	// append existing tags if exist to itemToAdd.tags object
// 	if (
// 		updatedItem.existingTags &&
// 		Object.entries(updatedItem.existingTags).length
// 	) {
// 		updatedItem = {
// 			...updatedItem,
// 			tags: {
// 				...updatedItem.tags,
// 				...updatedItem.existingTags,
// 			},
// 		};
// 	}

// 	// delete newTags & existingTags from updatedItem:
// 	delete updatedItem.newTags;
// 	delete updatedItem.existingTags;

// 	return updateItemInDatabase(updatedItem, key, userId)
// 		.then(() => {
// 			console.log("Item with the key", key, "was updated successfully!");
// 			dispatch({
// 				type: "add-item",
// 				payload: { key: key, item: updatedItem },
// 			});
// 		})
// 		.catch((error) => alert(error.message));
// }
