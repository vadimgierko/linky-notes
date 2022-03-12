import { database } from "../../firebaseConfig";
import { ref, set, push, child } from "firebase/database";
import { createDate } from "../../functions/functions";

/**
 * NOTE: This is experimental reusable addItem() function => don't use it, before I remove this comment!!!
 */

export default function addToDatabase(
	itemCategoryNameInSingular,
	itemCategoryNameInThePlural,
	item,
	userId,
	dispatch
) {
	// even if the date of creation or updates isn't needed => let it be
	const createdAt = createDate();

	let itemToAdd = {
		...item,
		createdAt: createdAt,
		userId: userId,
	};

	const key = push(
		child(ref(database), itemCategoryNameInThePlural + "/" + userId)
	).key;

	return set(
		ref(database, itemCategoryNameInThePlural + "/" + userId + "/" + key),
		{
			...item,
		}
	)
		.then(() => {
			console.log(
				itemCategoryNameInThePlural +
					" item was successfully added to database under the key:",
				key
			);
			dispatch({
				type: "add-" + itemCategoryNameInSingular,
				payload: { key: key, item: itemToAdd },
			});
		})
		.catch((error) => alert(error.message));
}
