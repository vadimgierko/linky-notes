import { createAsyncThunk } from "@reduxjs/toolkit";
import addItemWithGivenKey from "../../firebase-rtdb-crud/addItemWithGivenKey";
import { authorAdded } from "../../features/authors/authorsSlice";
import createDate from "../../helper-functions/createDate";

/**
 * addAuthor({author: {}, key: ""}) is a thunk function,
 * which consists all encapsulated logic of adding an author to database & store
 * & adding additional data to the author, like:
 * fullName (author.names.full), createdAt, userId.
 * NOTE: generate new firebase key (using generateFirebaseKeyFor())
 * before using this thunk & pass it in key prop in arg object.
 */
export const addAuthor = createAsyncThunk(
	"authors/add",
	async (arg, thunkAPI) => {
		//console.log("THUNK: adding author:", arg.key, arg.author);
		try {
			// at the moment author object has only props set in the author's form, so
			// we need to update it with all necessary props & metadata:
			const user = thunkAPI.getState().user.value;
			const authorObjectFromForm = arg.author;
			if (authorObjectFromForm.names.last.length) {
				let fullName = "";
				if (authorObjectFromForm.names.first.length) {
					fullName += authorObjectFromForm.names.first;
				}
				if (authorObjectFromForm.names.middle.length) {
					fullName += fullName.length
						? " " + authorObjectFromForm.names.middle
						: authorObjectFromForm.names.middle;
				}
				if (authorObjectFromForm.names.last.length) {
					fullName += fullName.length
						? " " + authorObjectFromForm.names.last
						: authorObjectFromForm.names.last;
				}
				let updatedAuthorObject = {};
				if (fullName.length) {
					//console.log("fullname", fullName);
					updatedAuthorObject = {
						...authorObjectFromForm,
						names: {
							...authorObjectFromForm.names,
							full: fullName,
						},
						createdAt: createDate(),
						userId: user.id,
					};
					const rootReference = "authors/" + user.id + "/";
					const referenceWithTheKey = rootReference + arg.key;
					//===========================================================
					await addItemWithGivenKey(referenceWithTheKey, updatedAuthorObject);
					//console.log("THUNK: author added:", arg.key, updatedAuthorObject);
					thunkAPI.dispatch(
						authorAdded({ id: arg.key, author: updatedAuthorObject })
					);
				} else {
					alert("Can not add author, because there are no author's names...");
					return;
				}
			} else {
				alert("Can not add author, because there is no author's last name...");
				return;
			}
		} catch (error) {
			console.log(error);
		}
	}
);
