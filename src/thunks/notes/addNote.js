import { createAsyncThunk } from "@reduxjs/toolkit";
import addItemWithGivenKey from "../../firebase-rtdb-crud/addItemWithGivenKey";
import { noteAdded } from "../../features/notes/notesSlice";

// arg = {reference, note, noteKey}
// NOTE: the note is added with given (generated before using thunk) key !!!
export const addNote = createAsyncThunk("notes/add", async (arg, thunkAPI) => {
	console.log("THUNK: adding item...");
	try {
		await addItemWithGivenKey(arg.reference, arg.note);
		console.log("THUNK: item added.");
		thunkAPI.dispatch(noteAdded({ id: arg.noteKey, note: arg.note }));
	} catch (error) {
		console.log(error);
	}
});
