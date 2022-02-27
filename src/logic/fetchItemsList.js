import { database } from "../firebaseConfig";
import { onValue, ref } from "firebase/database";

//=========== NEED TO LIMIT THIS FETCH UP TO 10 LAST
//=========== THEN 10 MORE WHEN SCROLLING

export default function fetchItemsList(userId, dispatch) {
	return onValue(
		ref(database, "items/" + userId + "/list"),
		(snapshot) => {
			const data = snapshot.val();
			console.log("fetched items list:", data);
			// need to map data =>
			// if (data) {
			// 	dispatch({
			// 		type: "add-fetched-item-to-fetched-items",
			// 		payload: {
			// 			key: itemKey,
			// 			item: data,
			// 		},
			// 	});
			// 	console.log("DATA WAS FETCHED: ITEM", itemKey);
			// } else {
			// 	console.log("There are no such item or smth went wrong...");
			// }
		},
		{
			onlyOnce: true,
		}
	);
}
