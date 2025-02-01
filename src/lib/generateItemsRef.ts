export default function generateItemsRef(
	itemType: "notes" | "tags",
	userId: string
) {
	return `users/${userId}/${itemType}`;
}
