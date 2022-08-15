import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: {}, // items are stored in object under the unique firebase key (id)
	pending: false, // pending = true when the data is fetching, deleting, adding or updating
};

export const authorsSlice = createSlice({
	name: "authors",
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
		authorsFetched: (state, action) => {
			//state.pending = false; // no need, because there is stopPending() in the thunk
			state.value = action.payload;
		},
		//=========================== ITEM CRUD =================================//
		authorAdded: (state, action) => {
			state.pending = false;
			state.value[action.payload.id] = action.payload.author;
		},
		// update the whole item:
		authorUpdated: (state, action) => {
			state.pending = false;
			state.value[action.payload.id] = action.payload.author;
		},
		authorDeleted: (state, action) => {
			state.pending = false;
			delete state.value[action.payload.id];
		},
		resetAuthors: (state) => {
			state.value = {};
			state.pending = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	startPending,
	stopPending,
	authorsFetched,
	authorAdded,
	authorUpdated,
	authorDeleted,
	resetAuthors,
} = authorsSlice.actions;

export default authorsSlice.reducer;
