import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchItems from "../../firebase-rtdb-crud/fetchItems";
import {
	startPending,
	stopPending,
	authorsFetched,
} from "../../features/authors/authorsSlice";

export const fetchAuthors = createAsyncThunk(
	"authors/fetch",
	async (arg, thunkAPI) => {
		console.log("THUNK: pending...");
		thunkAPI.dispatch(startPending());
		try {
			const authors = await fetchItems(arg.reference);
			console.log("THUNK: pending is over. Data fetched:", authors);
			if (authors) {
				thunkAPI.dispatch(authorsFetched(authors));
			}
		} catch (error) {
			console.log(error);
		}
		thunkAPI.dispatch(stopPending());
	}
);
