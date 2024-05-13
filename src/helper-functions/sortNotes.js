export default function sortNotes(notes = [], sortBy = "last updated") {
    // Create a new array with updated updatedAt properties if necessary
    const processedNotes = notes.map(note => {
        return {
            ...note,
            updatedAt: note.updatedAt || note.createdAt // Use createdAt if updatedAt is not defined,
        };
    }
    );

    // Sort notes based on sortBy
    processedNotes.sort((a, b) => {
        if (sortBy === 'lastUpdated') {
            return b.updatedAt.localeCompare(a.updatedAt);
        } else if (sortBy === 'firstUpdated') {
            return a.updatedAt.localeCompare(b.updatedAt);
        } else if (sortBy === 'lastCreated') {
            return b.createdAt.localeCompare(a.createdAt);
        } else if (sortBy === 'firstCreated') {
            return a.createdAt.localeCompare(b.createdAt);
        } else {
            // Default to sorting by lastUpdated if sortBy is invalid
            return b.updatedAt.localeCompare(a.updatedAt);
        }
    });

    return processedNotes;
}