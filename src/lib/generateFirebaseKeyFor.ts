import { rtdb } from "@/firebaseConfig";
import { child, push, ref } from "firebase/database";

export default function generateFirebaseKeyFor(itemTypeInPlural: "items" | "tags", uid: string) {
    if (!uid) {
        console.error("uid is not provided to generate firebase key...")
        return null
    }

    const key = push(child(ref(rtdb), itemTypeInPlural + "/" + uid)).key;
    return key
}