import { database } from "../firebaseConfig.js";
import { ref, set, push, child } from "firebase/database";
import { createDate } from "../functions/functions";
import addTag from "./addTag.js";

function addItemToDatabase(item, userId, key) {
	return set(ref(database, "items/" + userId + "/" + key), {
		...item,
	}).then(() =>
		console.log("Item was added to database under the key,", key)
	);
}

export default function addItem(item, userId, dispatch) {
	const createdAt = createDate();

	let itemToAdd = {
		...item,
		createdAt: createdAt,
		userId: userId,
	};

	// add new tags if exist & append them to itemToAdd.tags object
	if (itemToAdd.newTags && itemToAdd.newTags.length) {
		itemToAdd.newTags.forEach((newTag) => {
			const firebaseKey = push(
				child(ref(database), "tags/" + userId)
			).key;

			addTag(newTag, firebaseKey, userId, dispatch);

			itemToAdd = {
				...itemToAdd,
				tags: {
					...itemToAdd.tags,
					[firebaseKey]: {
						tag: newTag,
					},
				},
			};
		});
	}

	// append existing tags if exist to itemToAdd.tags object
	if (
		itemToAdd.existingTags &&
		Object.entries(itemToAdd.existingTags).length
	) {
		itemToAdd = {
			...itemToAdd,
			tags: {
				...itemToAdd.tags,
				...itemToAdd.existingTags,
			},
		};
	}

	// delete newTags & existingTags from itemToAdd:
	delete itemToAdd.newTags;
	delete itemToAdd.existingTags;

	const key = push(child(ref(database), "items/" + userId)).key;

	return addItemToDatabase(itemToAdd, userId, key)
		.then(() => {
			console.log("Item was added successfully!");
			dispatch({
				type: "add-fetched-item-to-fetched-items",
				payload: { key: key, item: itemToAdd },
			});
		})
		.catch((error) => alert(error.message));
}
