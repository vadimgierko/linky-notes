export interface Note {
	content: string;
	createdAt: string;
	pages: string;
	sourceKey: string;
	tags?: {
		[key: string]: Tag;
	};
	updatedAt: string;
	userId: string;
}

export interface UpgradedNote {
	content: string;
	createdAt: string;
	id: string;
	tags: {
		[key: string]: true;
	};
	updatedAt: string;
	userId: string;
}

export interface NoteWithId extends Note {
	id: string;
}

export type Tag = {
	createdAt?: string;
	tag: string;
	userId?: string;
	notes?: {
		[key: string]: true;
	};
};

export type UpgradedTag = {
	createdAt: string;
	id: string;
	tag: string;
	updatedAt: string;
	userId: string;
	notes: {
		[key: string]: true;
	};
};
