import { database } from "../firebaseConfig.js";
import { ref, set, push, child } from "firebase/database";

export default function addTags(newTags) {
	// return set(ref(database, "tags/"), {
	// 	tags: [...tags, ...newTags],
	// });
}
