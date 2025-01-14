export type Note = {
	content: string;
	createdAt: string;
	pages: string;
	sourceKey: string;
	tags?: {
		[key: string]: Tag;
	};
	updatedAt: string;
	userId: string;
};

export type Tag = {
	createdAt?: string;
	tag: string;
	userId?: string;
};
