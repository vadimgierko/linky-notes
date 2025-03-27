export type KeyBoolean = {
	[key: string]: true;
};

/**
 * Common props for Note & Tag.
 */
interface Item {
	backlinks?: KeyBoolean;
	createdAt: {
		/**
		 * Automatically generated timestamp,
		 * containing the date,
		 * when the tag is added to the app.
		 */
		auto: number;
		custom?: number;
	};
	forwardlinks?: KeyBoolean;
	id: string;
	parents?: KeyBoolean;
	related?: KeyBoolean;
	updatedAt: number;
	userId: string;
}

export interface Note extends Item {
	/**
	 * Cannot be optional,
	 * becuase note has to have at least 1 child (content).
	 */
	children: {
		[key: number]: {
			type: "content" | "note";
			value: string;
		};
	};
	/**
	 * Cannot be optional, like tag's notes,
	 * because note has to have at least 1 tag.
	 */
	tags: KeyBoolean;
}

export interface Notes {
	[key: string]: Note;
}

/**
 * NoteObjectForUpdate is almost like Note interface,
 * but instead of tags prop it has:
 * - existingTags (same as prev tags)
 * - newTags (string[])
 * - removedExistingTags (string[]) - added automatically before submit
 * - addedExistingTags: (string[]) - added automatically before submit
 *
 * 🚀❗ CHECK IF REMOVING A NEW TAG WORKS... ❗🚀
 */
export interface NoteObjectForUpdate {
	children: Note["children"];
	createdAt: Note["createdAt"];
	id: string;
	updatedAt: number;
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

export interface Tag extends Item {
	children?: KeyBoolean;
	/**
	 * Notes may be undefined,
	 * because Firebase RTDB doesn't store empty objects,
	 * and this will be the case, if tag has no notes...
	 *
	 * When this will be rewritten to Firestore,
	 * this will be unnecessary, because it will be an array,
	 * and Firestore stores empty arrays.
	 */
	notes?: KeyBoolean;
	sameTagsInDiffLangs?: KeyBoolean;
	value: string;
}

export interface Tags {
	[key: string]: Tag;
}

export type SortBy =
	| "lastUpdated"
	| "firstUpdated"
	| "lastCreated"
	| "firstCreated";
