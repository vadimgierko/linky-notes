import { database } from "../../firebaseConfig";
import { onValue, ref } from "firebase/database";

export default function fetchFromDatabase(
	itemCategoryNameInThePlural,
	userId,
	dispatch
) {
	return onValue(
		ref(database, itemCategoryNameInThePlural + "/" + userId),
		(snapshot) => {
			const data = snapshot.val();
			if (data) {
				dispatch({
					type: "set-" + itemCategoryNameInThePlural,
					payload: data,
				});
				console.log(
					"DATA WAS FETCHED: ALL USER'S " +
						itemCategoryNameInThePlural.toUpperCase() +
						"."
				);
			} else {
				console.log(
					"There are no " +
						itemCategoryNameInThePlural +
						" or smth went wrong..."
				);
			}
		},
		{
			onlyOnce: true,
		}
	);
}
