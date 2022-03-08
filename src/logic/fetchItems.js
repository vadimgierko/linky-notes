import { database } from "../firebaseConfig";
import { onValue, ref } from "firebase/database";

//=========== NEED TO LIMIT THIS FETCH UP TO 10 LAST
//=========== THEN 10 MORE WHEN SCROLLING

export default function fetchItems(userId, dispatch) {
	return onValue(
		ref(database, "items/" + userId),
		(snapshot) => {
			const data = snapshot.val();
			if (data) {
				dispatch({
					type: "set-items",
					payload: data,
				});
				console.log("DATA WAS FETCHED: ALL USER'S ITEMS.");
			} else {
				console.log("There are no items or smth went wrong...");
			}
		},
		{
			onlyOnce: true,
		}
	);
}
