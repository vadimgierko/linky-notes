import { rtdb } from "@/firebaseConfig";
import { child, push, ref } from "firebase/database";
import generateItemsRef from "./generateItemsRef";

export default function generateFirebaseKeyFor(
	itemTypeInPlural: "notes" | "tags",
	uid: string
) {
	if (!uid) {
		console.error("uid is not provided to generate firebase key...");
		return null;
	}

	const key = push(
		child(ref(rtdb), generateItemsRef(itemTypeInPlural, uid))
	).key;
	return key;
}
