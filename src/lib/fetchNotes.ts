import { get, ref } from "firebase/database";
import generateItemsRef from "./generateItemsRef";
import { rtdb } from "@/firebaseConfig";
import { Note } from "@/types";

async function fetchNote(id: string, uid: string) {
	const noteRef = generateItemsRef("notes", uid) + "/" + id;

	const noteSnapshot = await get(ref(rtdb, noteRef));

	if (noteSnapshot.exists()) {
		const note = noteSnapshot.val() as Note;

		console.log("DATA WAS FETCHED: note of id", id);

		//==================== listen to updates: ====================//
		// const unsubsribe = onValue(
		//     ref(rtdb, noteRef),
		//     (snapshot) => {
		//         const note = snapshot.val() as Note;
		//         console.log("DATA WAS FETCHED onValue: note of id", id);
		//         setNotes(prevNotes => prevNotes
		//             ? ({ ...prevNotes, [id]: note })
		//             : ({ [id]: note })
		//         );
		//     },
		// );

		// unsubscribes.current[id] = unsubsribe
		//============================================================//
		return note;
	} else {
		console.log("DATA WAS NOT FETCHED: note of id", id, "...");
		return null;
	}
}

export default async function fetchNotes(ids: string[], uid: string) {
	if (!ids.length) return [];

	const fetchedNotes = await Promise.all(
		ids.map(async (id) => fetchNote(id, uid))
	);

	return fetchedNotes;
}

// const n: Note = {
// 	id: "-NZc0sjRewqzmTeNWQG5",
// 	content:
// 		'# Adding the whole website to the note TEST\n\n```\n<iframe\n  src="https://vadimgierko.github.io/linky-notes/about"\n  width="100%"\n  height="500px"\n  title="Linky Notes About Page"\n></iframe>\n```',
// 	createdAt: "2023.07.05",
// 	tags: {
// 		"-MxM8YFBYoe_nyc70jPa": true,
// 		"-N9TNxU_0iyrNxAvBFok": true,
// 		"-NZSrAyXS5ixGMchV_p3": true,
// 		"-NZSrAyYWK_sLKci4YL0": true,
// 		"-NydjXdx7Vki7WW_71Z2": true,
// 	},
// 	updatedAt: "2024.05.24",
// 	userId: "so9O3nfXwVXgR9k9eopVGcgaQWz2",
// };
