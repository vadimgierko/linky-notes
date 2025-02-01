// These are new upgraded types since 31.01.2025
// which replaced commented prev types below:
export interface Note {
	content: string;
	createdAt: string;
	id: string;
	/**
	 * Tags are not optional, like tag's notes,
	 * because note has to have at least 1 tag.
	 */
	tags: {
		[key: string]: true;
	};
	updatedAt: string;
	userId: string;
}

export interface Notes {
	[key: string]: Note;
}

/**
 * NoteObjectForUpdate is almost like Note interface,
 * but instead of tags prop it has:
 * existingTags (same as tags) & newTags (string[])
 */
export interface NoteObjectForUpdate {
	content: string;
	createdAt: string;
	id: string;
	updatedAt: string;
	userId: string;
	/**
	 * Note's tags that exist already in RTDB.
	 *
	 * It can be same tags and previously in the note,
	 * but also newly added existing tags.
	 *
	 * To deal with newly added & removed extisting tags,
	 * `removedExistingTags` & `addedExistingTags` props are used,
	 * which are updated automatically before `NoteForm` submit.
	 */
	existingTags: {
		[key: string]: true;
	};
	/**
	 * New tags to create & add to RTDB.
	 */
	newTags: string[];
	/**
	 * Are used to deal with removed extisting tags,
	 * & are updated automatically before `NoteForm` submit.
	 */
	removedExistingTags: string[];
	/**
	 * Are used to deal with newly added extisting tags,
	 * & are updated automatically before `NoteForm` submit.
	 */
	addedExistingTags: string[];
}

export interface Tag {
	createdAt: string;
	id: string;
	tag: string;
	updatedAt: string;
	userId: string;
	/**
	 * Notes may be undefined,
	 * because Firebase RTDB doesn't store empty objects,
	 * and this will be the case, if tag has no notes...
	 *
	 * When this will be rewritten to Firestore,
	 * this will be unnecessary, because it will be an array,
	 * and Firestore stores empty arrays.
	 */
	notes?: {
		[key: string]: true;
	};
}

export interface Tags {
	[key: string]: Tag;
}

// export interface PrevNote {
// 	content: string;
// 	createdAt: string;
// 	pages: string;
// 	sourceKey: string;
// 	tags?: {
// 		[key: string]: Tag;
// 	};
// 	updatedAt: string;
// 	userId: string;
// }

// export interface PrevNoteWithId extends Note {
// 	id: string;
// }

// export type PrevTag = {
// 	createdAt?: string;
// 	tag: string;
// 	userId?: string;
// 	notes?: {
// 		[key: string]: true;
// 	};
// };
