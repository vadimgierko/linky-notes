// import { createAsyncThunk } from "@reduxjs/toolkit";
// import updateItem from "../../firebase-rtdb-crud/updateItem";
// import { authorUpdated } from "../../features/authors/authorsSlice";
// import createDate from "../../helper-functions/createDate";

// /**
//  * update({author: "", key: ""}) is a thunk function,
//  * which consists all encapsulated logic of updating an author in database & store,
//  * & adding additional data to the author, like:
//  * updatedAt.
//  */
// export const updateAuthor = createAsyncThunk(
// 	"authors/update",
// 	async (arg, thunkAPI) => {
// 		//console.log("THUNK: updating author:", arg.key, arg.author);
// 		try {
// 			// we need to update author object with updatedAt prop:
// 			const user = thunkAPI.getState().user.value;
// 			const authorToUpdate = arg.author;
// 			if (authorToUpdate.names.last.length) {
// 				let fullName = "";
// 				if (authorToUpdate.names.first.length) {
// 					fullName += authorToUpdate.names.first;
// 				}
// 				if (authorToUpdate.names.middle.length) {
// 					fullName += fullName.length
// 						? " " + authorToUpdate.names.middle
// 						: authorToUpdate.names.middle;
// 				}
// 				if (authorToUpdate.names.last.length) {
// 					fullName += fullName.length
// 						? " " + authorToUpdate.names.last
// 						: authorToUpdate.names.last;
// 				}
// 				let updatedAuthor = {};
// 				if (fullName.length) {
// 					updatedAuthor = {
// 						...authorToUpdate,
// 						names: {
// 							...authorToUpdate.names,
// 							full: authorToUpdate.names.middle
// 								? authorToUpdate.names.first +
// 								  " " +
// 								  authorToUpdate.names.middle +
// 								  " " +
// 								  authorToUpdate.names.last
// 								: authorToUpdate.names.first + " " + authorToUpdate.names.last,
// 						},
// 						updatedAt: createDate(),
// 					};
// 					const rootReference = "authors/" + user.id + "/";
// 					const referenceWithTheKey = rootReference + arg.key;
// 					//===========================================================
// 					await updateItem(referenceWithTheKey, updatedAuthor);
// 					//console.log("THUNK: author updated:", arg.key, updatedAuthor);
// 					thunkAPI.dispatch(
// 						authorUpdated({ id: arg.key, author: updatedAuthor })
// 					);
// 				} else {
// 					alert(
// 						"Can not update author, because there are no author's names..."
// 					);
// 					return;
// 				}
// 			}
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	}
// );
