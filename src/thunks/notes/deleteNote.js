import { createAsyncThunk } from "@reduxjs/toolkit";
import deleteItem from "../firebase-rtdb-crud/deleteItem";
import { noteDeleted } from "../../features/notes/notesSlice";

// arg: {reference, itemKey}
export const deleteNote = createAsyncThunk(
	"items/delete",
	async (arg, thunkAPI) => {
		console.log("THUNK: deleting item...");
		try {
			await deleteItem(arg.reference);
			console.log("THUNK: item successfully deleted from", arg.reference);
			thunkAPI.dispatch(noteDeleted({ id: arg.itemKey }));
		} catch (error) {
			console.log(error);
		}
	}
);
