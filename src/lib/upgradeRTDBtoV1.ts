// import { Notes, Tags } from "@/types";
// import date from "./date";
// import { get, ref, set } from "firebase/database";
// import { rtdb } from "@/firebaseConfig";
// import { V1Note, V1Tag } from "@/types/v1";

// type UpgradeRTDBtoV1Props = {
//     uid: string;
//     prevTags: Tags;
// }

// export default async function upgradeRTDBtoV1({
//     uid, prevTags
// }: UpgradeRTDBtoV1Props) {
//     const prevNotesSnapshot = await get(ref(rtdb, `users/${uid}/notes`));

//     if (prevNotesSnapshot.exists()) {
//         const prevNotes = prevNotesSnapshot.val() as Notes;

//         console.log("prevNotes fetched:", prevNotes);

//         const upgradedNotes: { [key: string]: V1Note } = Object
//             .values(prevNotes)
//             .map(prevNote => {
//                 const upgradedNote: V1Note = {
//                     children: {
//                         0: {
//                             type: "content",
//                             value: prevNote.content
//                         }
//                     },
//                     createdAt: {
//                         auto: date.convertV0dateStringToTimestamp(prevNote.createdAt)
//                     },
//                     updatedAt: date.convertV0dateStringToTimestamp(prevNote.updatedAt),
//                     tags: prevNote.tags,
//                     id: prevNote.id,
//                     userId: prevNote.userId
//                 }

//                 return upgradedNote
//             })
//             .reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {} as { [key: string]: V1Note });

//         const upgradedTags: { [key: string]: V1Tag } = Object
//             .values(prevTags)
//             .map(prevTag => {
//                 const upgradedTag: V1Tag = {
//                     createdAt: {
//                         auto: date.convertV0dateStringToTimestamp(prevTag.createdAt)
//                     },
//                     notes: prevTag.notes,
//                     updatedAt: date.convertV0dateStringToTimestamp(prevTag.updatedAt),
//                     value: prevTag.tag,
//                     id: prevTag.id,
//                     userId: prevTag.userId
//                 }

//                 return upgradedTag
//             })
//             .reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {} as { [key: string]: V1Tag });

//         console.log("Upgrading user's tags & notes...");

//         await set(ref(rtdb, "notes/" + uid), upgradedNotes);
//         await set(ref(rtdb, "tags/" + uid), upgradedTags);

//         console.log("User tags & notes are upgraded!");
//     }
// }
