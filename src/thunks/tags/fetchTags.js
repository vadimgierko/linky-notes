import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchItems from "../../firebase-rtdb-crud/fetchItems";
import {
	startPending,
	stopPending,
	tagsFetched,
} from "../../features/tags/tagsSlice";

export const fetchTags = createAsyncThunk(
	"tags/fetch",
	async (arg, thunkAPI) => {
		console.log("THUNK: pending...");
		thunkAPI.dispatch(startPending());
		try {
			const tags = await fetchItems(arg.reference);
			console.log("THUNK: pending is over. Data fetched:", tags);
			if (tags) {
				thunkAPI.dispatch(tagsFetched(tags));
			}
		} catch (error) {
			console.log(error);
		}
		thunkAPI.dispatch(stopPending());
	}
);
