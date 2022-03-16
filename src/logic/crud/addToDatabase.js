import { database } from "../../firebaseConfig";
import { ref, set } from "firebase/database";
import { createDate } from "../../functions/functions";

/**
 * NOTE: This is experimental reusable abstract addItem() function => don't use it, before I remove this comment!!!
 * It will be used in add${itemCategoryNameInSingular} functions,
 * which will be more complex & custom depending from app requirements.
 */

// props are structured in a firebase reference order
export default function addToDatabase(
	itemCategoryNameInSingular,
	itemCategoryNameInThePlural,
	userId,
	itemKey,
	item,
	dispatch
) {
	// even if the date of creation or updates isn't needed => let it be
	const createdAt = createDate();

	const itemToAdd = {
		...item,
		createdAt: createdAt,
		userId: userId,
	};

	return set(
		ref(database, itemCategoryNameInThePlural + "/" + userId + "/" + itemKey),
		{
			...itemToAdd,
		}
	)
		.then(() => {
			console.log(
				itemCategoryNameInThePlural +
					" item was successfully added to database under the key:",
				itemKey
			);
			dispatch({
				type: "add-" + itemCategoryNameInSingular,
				payload: { key: itemKey, item: itemToAdd },
			});
		})
		.catch((error) => alert(error.message));
}
