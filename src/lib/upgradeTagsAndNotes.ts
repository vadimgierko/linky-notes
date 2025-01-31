import { rtdb } from "@/firebaseConfig";
import { Note, Tag, UpgradedNote, UpgradedTag } from "@/types";
import { User } from "firebase/auth";
import { ref, set } from "firebase/database";

export async function upgradeNotesAndTags(
    user: User,
    tags: { [key: string]: Tag },
    notes: { [key: string]: Note }
) {
    const LOCAL_NOTES_ARRAY = notes
        ? Object.keys(notes).map((id) => ({ ...notes[id], id }))
        : [];

    function getTagNotesIdsArray(tagId: string) {
        return LOCAL_NOTES_ARRAY.filter((note) =>
            note.tags ? note.tags[tagId] : false
        ).map((note) => note.id);
    }

    console.log("Upgrading user's tags & notes...");

    const upgradedTags: { [key: string]: UpgradedTag } = {};
    const upgradedNotes: { [key: string]: UpgradedNote } = {};

    // upgrade tags
    Object.keys(tags).forEach((tagId) => {
        const prevTag = tags[tagId];

        const prevTagNotes: { [key: string]: true } = getTagNotesIdsArray(
            tagId
        ).reduce((prev, curr) => ({ ...prev, [curr]: true }), {});

        const upgradedTag: UpgradedTag = {
            createdAt: prevTag.createdAt || "2025.01.30",
            id: tagId,
            tag: prevTag.tag,
            updatedAt: prevTag.createdAt || "2025.01.30",
            userId: user.uid,
            notes: prevTagNotes,
        };

        upgradedTags[tagId] = upgradedTag;
    });

    // upgrade notes
    Object.keys(notes).forEach((noteId) => {
        const prevNote = notes[noteId];
        const prevNoteUpgradedTags: UpgradedNote["tags"] = {};

        if (prevNote.tags) {
            Object.keys(prevNote.tags).forEach(
                (tagId) => (prevNoteUpgradedTags[tagId] = true)
            );
        }

        const upgradedNote: UpgradedNote = {
            content: prevNote.content,
            createdAt: prevNote.createdAt,
            id: noteId,
            tags: prevNoteUpgradedTags,
            updatedAt: prevNote.updatedAt || prevNote.createdAt,
            userId: prevNote.userId,
        };

        upgradedNotes[noteId] = upgradedNote;
    });

    await set(ref(rtdb, "users/" + user.uid), {
        notes: upgradedNotes,
        tags: upgradedTags,
    });

    console.log("User tags & notes are upgraded!");
}