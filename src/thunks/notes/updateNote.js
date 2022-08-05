import { createAsyncThunk } from "@reduxjs/toolkit";
import updateItem from "../../firebase-rtdb-crud/updateItem";
import { noteUpdated } from "../../features/notes/notesSlice";
import createDate from "../../helper-functions/createDate";
import { addTag } from "../tags/addTag";
import generateFirebaseKeyFor from "../../firebase-rtdb-crud/generateFirebaseKeyFor";

/**
 * update({note: "", key: ""}) is a thunk function,
 * which consists all encapsulated logic of updating a note in database & store,
 * including adding new tags to the database & store
 * & adding additional data to the note, like:
 * updatedAt.
 */
export const updateNote = createAsyncThunk(
	"notes/update",
	async (arg, thunkAPI) => {
		console.log("THUNK: updating note:", arg.note);
		try {
			// we need to update note with updatedAt prop:
			const user = thunkAPI.getState().user.value;
			const noteToUpdate = arg.note;
			if (noteToUpdate.content.length) {
				let noteWithUnifiedTagsAndUpdatedAt = {
					content: noteToUpdate.content,
					tags: noteToUpdate.existingTags,
					createdAt: noteToUpdate.createdAt,
					updatedAt: createDate(),
					userId: noteToUpdate.userId,
				};
				// check for new tags to add:
				if (noteToUpdate.newTags && noteToUpdate.newTags.length) {
					console.log("There are new tags to add to database!");
					noteToUpdate.newTags.forEach((newTag) => {
						console.log("There is a new tag to add to database:", newTag);
						const key = generateFirebaseKeyFor("tags/" + user.id);
						noteWithUnifiedTagsAndUpdatedAt = {
							...noteWithUnifiedTagsAndUpdatedAt,
							tags: {
								...noteWithUnifiedTagsAndUpdatedAt.tags,
								[key]: {
									tag: newTag,
									createdAt: createDate(),
									userId: user.id,
								},
							},
						};
						thunkAPI.dispatch(addTag({ tag: newTag, key: key }));
					});
				} else {
					console.log("There are no new tags to add to database...");
				}
				const rootReference = "items/" + user.id + "/";
				const referenceWithTheKey = rootReference + arg.key;
				//===========================================================
				await updateItem(referenceWithTheKey, noteWithUnifiedTagsAndUpdatedAt);
				console.log("THUNK: item updated:", noteWithUnifiedTagsAndUpdatedAt);
				thunkAPI.dispatch(
					noteUpdated({ id: arg.key, note: noteWithUnifiedTagsAndUpdatedAt })
				);
			}
		} catch (error) {
			console.log(error);
		}
	}
);
