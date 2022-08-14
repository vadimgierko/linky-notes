import { createAsyncThunk } from "@reduxjs/toolkit";
import addItemWithGivenKey from "../../firebase-rtdb-crud/addItemWithGivenKey";
import { noteAdded } from "../../features/notes/notesSlice";
import createDate from "../../helper-functions/createDate";
import { addTag } from "../tags/addTag";
import generateFirebaseKeyFor from "../../firebase-rtdb-crud/generateFirebaseKeyFor";

/**
 * addNote({note: "", key: ""}) is a thunk function,
 * which consists all encapsulated logic of adding a note to database & store,
 * including adding new tags to the database & store
 * & adding additional data to the note, like:
 * createdAt, userId.
 * NOTE: generate new firebase key (using generateFirebaseKeyFor())
 * before using this thunk & pass it in key prop in arg object.
 */
export const addNote = createAsyncThunk("notes/add", async (arg, thunkAPI) => {
	console.log("THUNK: adding note:", arg.note);
	try {
		// at the moment note has only props set in the note form, so
		// we need to update it with all necessary props & metadata:
		const user = thunkAPI.getState().user.value;
		const noteFromForm = arg.note;
		if (noteFromForm.content.length) {
			let noteWithUnifiedTagsAndCreatedAt = {
				content: noteFromForm.content,
				tags: noteFromForm.existingTags,
				sourceKey: noteFromForm.sourceKey,
				pages: noteFromForm.pages,
				createdAt: createDate(),
				userId: user.id,
			};
			// check for new tags to add:
			if (noteFromForm.newTags && noteFromForm.newTags.length) {
				console.log("There are new tags to add to database!");
				noteFromForm.newTags.forEach((newTag) => {
					console.log("There is a new tag to add to database:", newTag);
					const key = generateFirebaseKeyFor("tags/" + user.id);
					noteWithUnifiedTagsAndCreatedAt = {
						...noteWithUnifiedTagsAndCreatedAt,
						tags: {
							...noteWithUnifiedTagsAndCreatedAt.tags,
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
				console.log("There are no new tags to add to database!");
			}
			const rootReference = "items/" + user.id + "/";
			const referenceWithTheKey = rootReference + arg.key;
			//===========================================================
			await addItemWithGivenKey(
				referenceWithTheKey,
				noteWithUnifiedTagsAndCreatedAt
			);
			console.log("THUNK: item added.");
			thunkAPI.dispatch(
				noteAdded({ id: arg.key, note: noteWithUnifiedTagsAndCreatedAt })
			);
		}
	} catch (error) {
		console.log(error);
	}
});
