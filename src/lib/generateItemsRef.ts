export function generateItemsRef(itemType: "notes" | "tags", userId: string) {
	return `${itemType}/${userId}`;
}

export function generateItemRef(
	itemType: "notes" | "tags",
	userId: string,
	itemId: string
) {
	return `${itemType}/${userId}/${itemId}`;
}
