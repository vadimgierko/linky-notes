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

export interface NoteWithId extends Note {
	id: string;
}

export type Tag = {
	createdAt?: string;
	tag: string;
	userId?: string;
};
