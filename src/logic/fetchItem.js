import { database } from "../../firebaseConfig";
import { onValue, ref } from "firebase/database";

export default function fetchItem(itemKey, userId, dispatch) {
	return onValue(
		ref(database, "items/" + userId + "/" + itemKey),
		(snapshot) => {
			const data = snapshot.val();
			if (data) {
				dispatch({
					type: "add-fetched-item-to-fetched-items",
					payload: {
						key: itemKey,
						item: data,
					},
				});
				console.log("DATA WAS FETCHED: ITEM", itemKey);
			} else {
				console.log("There are no such item or smth went wrong...");
			}
		},
		{
			onlyOnce: true,
		}
	);
}
