import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: {}, // items are stored in object under the unique firebase key (id)
	pending: false, // pending = true when the data is fetching, deleting, adding or updating
};

export const tagsSlice = createSlice({
	name: "tags",
	initialState,
	reducers: {
		//============================ PENDING =================================//
		startPending: (state) => {
			state.pending = true;
		},
		stopPending: (state) => {
			state.pending = false;
		},
		//=========================== ITEMS CRUD ================================//
		tagsFetched: (state, action) => {
			//state.pending = false; // no need, because there is stopPending() in the thunk
			state.value = action.payload;
		},
		//=========================== ITEM CRUD =================================//
		tagAdded: (state, action) => {
			state.pending = false;
			state.value[action.payload.id] = action.payload.tag;
		},
		//=========== RESET ITEMS STATE =======================/
		resetState: (state) => {
			state.value = {};
			state.pending = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	startPending,
	stopPending,
	tagsFetched,
	tagFetched,
	resetState,
} = tagsSlice.actions;

export default tagsSlice.reducer;
