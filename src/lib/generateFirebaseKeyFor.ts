import { rtdb } from "@/firebaseConfig";
import { child, push, ref } from "firebase/database";
import { generateItemsRef } from "./generateItemsRef";

export default function generateFirebaseKeyFor(
	itemTypeInPlural: "notes" | "tags",
	uid: string
): string | null {
	if (!uid) {
		console.error("UID is not provided. Cannot generate Firebase key.");
		return null;
	}

	const itemsRef = generateItemsRef(itemTypeInPlural, uid);

	const { key } = push(child(ref(rtdb), itemsRef));
	return key;
}
