import generateFirebaseKeyFor from "../crud/generateFirebaseKeyFor";
import addAuthor from "../author/addAuthor";
import addToDatabase from "../crud/addToDatabase";

export default function addSource(
	item, // source object {}
	userId,
	dispatch
) {
	//== TO DO ==> check if there is new author (no author key)
	// if true:
	const author = { ...item.author };
	const authorKey = generateFirebaseKeyFor("authors", userId);
	if (authorKey) {
		addAuthor(author, authorKey, userId, dispatch).then(() => {
			let sourceWithAuthorKey = {
				...item,
				authorKey: authorKey,
			};
			delete sourceWithAuthorKey.author;
			const sourceKey = generateFirebaseKeyFor("sources", userId);
			if (sourceKey) {
				return addToDatabase(
					"source",
					"sources",
					userId,
					sourceKey,
					sourceWithAuthorKey,
					dispatch
				);
			}
		});
	}
}
