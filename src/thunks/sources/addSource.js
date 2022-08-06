import { createAsyncThunk } from "@reduxjs/toolkit";
import addItemWithGivenKey from "../../firebase-rtdb-crud/addItemWithGivenKey";
import { sourceAdded } from "../../features/sources/sourcesSlice";
import createDate from "../../helper-functions/createDate";

/**
 * addSource({source: {}, key: ""}) is a thunk function,
 * which consists all encapsulated logic of adding a source to database & store
 * & adding additional data to the source, like:
 * createdAt, userId.
 * NOTE: generate new firebase key (using generateFirebaseKeyFor())
 * before using this thunk & pass it in key prop in arg object.
 */
export const addSource = createAsyncThunk(
	"sources/add",
	async (arg, thunkAPI) => {
		console.log("THUNK: adding source:", arg.key, arg.source);
		try {
			// at the moment source object has only props set in the source's form, so
			// we need to update it with all necessary props & metadata:
			const user = thunkAPI.getState().user.value;
			const sourceObjectFromForm = arg.source;
			if (sourceObjectFromForm.title && sourceObjectFromForm.authorKey) {
				const updatedSourceObject = {
					...sourceObjectFromForm,
					createdAt: createDate(),
					userId: user.id,
				};
				const rootReference = "sources/" + user.id + "/";
				const referenceWithTheKey = rootReference + arg.key;
				//===========================================================
				await addItemWithGivenKey(referenceWithTheKey, updatedSourceObject);
				console.log("THUNK: source added:", arg.key, updatedSourceObject);
				thunkAPI.dispatch(
					sourceAdded({ id: arg.key, source: updatedSourceObject })
				);
			}
		} catch (error) {
			console.log(error);
		}
	}
);
