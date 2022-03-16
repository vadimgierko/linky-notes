import addToDatabase from "../crud/addToDatabase";

export default function addAuthor(
	item, // author object {}
	itemKey,
	userId,
	dispatch
) {
	return addToDatabase("author", "authors", userId, itemKey, item, dispatch);
}
