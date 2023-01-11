// import { createAsyncThunk } from "@reduxjs/toolkit";
// import updateItem from "../../firebase-rtdb-crud/updateItem";
// import { sourceUpdated } from "../../features/sources/sourcesSlice";
// import createDate from "../../helper-functions/createDate";

// /**
//  * update({source: "", key: ""}) is a thunk function,
//  * which consists all encapsulated logic of updating a source in database & store
//  * & adding additional data to the note, like:
//  * updatedAt.
//  */
// export const updateSource = createAsyncThunk(
// 	"sources/update",
// 	async (arg, thunkAPI) => {
// 		//console.log("THUNK: updating soure:", arg.source);
// 		try {
// 			// we need to update source with updatedAt prop:
// 			const user = thunkAPI.getState().user.value;
// 			const sourceToUpdate = arg.source;
// 			const updatedSource = {
// 				...sourceToUpdate,
// 				updatedAt: createDate(),
// 			};
// 			const rootReference = "sources/" + user.id + "/";
// 			const referenceWithTheKey = rootReference + arg.key;
// 			//===========================================================
// 			await updateItem(referenceWithTheKey, updatedSource);
// 			//console.log("THUNK: source updated:", updatedSource);
// 			thunkAPI.dispatch(sourceUpdated({ id: arg.key, source: updatedSource }));
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	}
// );
