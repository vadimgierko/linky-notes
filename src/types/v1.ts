export type KeyBoolean = {
	[key: string]: true;
};

export namespace V1 {
	/**
	 * Common props for Note & Tag.
	 */
	export interface Item {
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
				type: "content" | "note",
				value: string
			}
		};
		/**
		 * Cannot be optional, like tag's notes,
		 * because note has to have at least 1 tag.
		 */
		tags: KeyBoolean;
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
}