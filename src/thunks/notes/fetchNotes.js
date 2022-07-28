import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchItems from "../../firebase-rtdb-crud/fetchItems";
import {
	startPending,
	stopPending,
	notesFetched,
} from "../../features/notes/notesSlice";

export const fetchNotes = createAsyncThunk(
	"notes/fetch",
	async (arg, thunkAPI) => {
		console.log("THUNK: pending...");
		thunkAPI.dispatch(startPending());
		try {
			const notes = await fetchItems(arg.reference);
			console.log("THUNK: pending is over. Data fetched:", notes);
			if (notes) {
				thunkAPI.dispatch(notesFetched(notes));
			}
		} catch (error) {
			console.log(error);
		}
		thunkAPI.dispatch(stopPending());
	}
);
