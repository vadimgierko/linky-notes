import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchItems from "../../firebase-rtdb-crud/fetchItems";
import {
	startPending,
	stopPending,
	sourcesFetched,
} from "../../features/sources/sourcesSlice";

export const fetchSources = createAsyncThunk(
	"sources/fetch",
	async (arg, thunkAPI) => {
		//console.log("THUNK: pending...");
		thunkAPI.dispatch(startPending());
		try {
			const sources = await fetchItems(arg.reference);
			//console.log("THUNK: pending is over. Data fetched:", sources);
			if (sources) {
				thunkAPI.dispatch(sourcesFetched(sources));
			}
		} catch (error) {
			console.log(error);
		}
		thunkAPI.dispatch(stopPending());
	}
);
