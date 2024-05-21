export function getTagNotes(tagId, NOTES = {}) {
    if (!tagId) return console.error("No tagId was passed to getTagNotes()...");

    const NOTES_ARRAY = Object.keys(NOTES).map(id => ({ ...NOTES[id], id }));

    return NOTES_ARRAY.filter(note => note.tags[tagId]);
}

export function getTagNotesNum(tagId, NOTES = {}) {
    if (!tagId) return console.error("No tagId was passed to getTagNotesNum()...");

    const NOTES_ARRAY = Object.keys(NOTES).map(id => ({ ...NOTES[id], id }));

    return NOTES_ARRAY.filter(note => note.tags[tagId]).length
}