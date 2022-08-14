import { createAsyncThunk } from "@reduxjs/toolkit";
import addItemWithGivenKey from "../../firebase-rtdb-crud/addItemWithGivenKey";
import { tagAdded } from "../../features/tags/tagsSlice";
import createDate from "../../helper-functions/createDate";

/**
 * addTag({tag: "", key: ""}) is a thunk function,
 * which consists all encapsulated logic of adding a tag to database & store
 * & adding additional data to the tag, like:
 * createdAt, userId.
 * NOTE: generate new firebase key (using generateFirebaseKeyFor())
 * before using this thunk & pass it in key prop in arg object.
 */
export const addTag = createAsyncThunk("tags/add", async (arg, thunkAPI) => {
	console.log("THUNK: adding tag...");
	try {
		// we need to update our tag (string) with all necessary props & metadata:
		const user = thunkAPI.getState().user.value;
		const tagString = arg.tag;
		if (tagString.length) {
			const tagWithExtraData = {
				tag: tagString,
				createdAt: createDate(),
				userId: user.id,
			};
			const rootReference = "tags/" + user.id + "/";
			const referenceWithTheKey = rootReference + arg.key;
			//===========================================================
			await addItemWithGivenKey(referenceWithTheKey, tagWithExtraData);
			console.log("THUNK: tag added.");
			thunkAPI.dispatch(tagAdded({ id: arg.key, tag: tagWithExtraData }));
		}
	} catch (error) {
		console.log(error);
	}
});
