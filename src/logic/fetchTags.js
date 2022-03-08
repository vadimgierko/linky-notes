import { database } from "../firebaseConfig";
import { onValue, ref } from "firebase/database";

export default function fetchTags(userId, dispatch) {
	return onValue(
		ref(database, "tags/" + userId),
		(snapshot) => {
			const data = snapshot.val();
			if (data) {
				dispatch({
					type: "set-tags",
					payload: data,
				});
				console.log("DATA WAS FETCHED: ALL USER'S TAGS.");
			} else {
				console.log("There are no tags or smth went wrong...");
			}
		},
		{
			onlyOnce: true,
		}
	);
}
