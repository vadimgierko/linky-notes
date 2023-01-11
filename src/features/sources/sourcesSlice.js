import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: {}, // items are stored in object under the unique firebase key (id)
	pending: false, // pending = true when the data is fetching, deleting, adding or updating
};

export const sourcesSlice = createSlice({
	name: "sources",
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
		sourcesFetched: (state, action) => {
			//state.pending = false; // no need, because there is stopPending() in the thunk
			state.value = action.payload;
		},
		//=========================== ITEM CRUD =================================//
		sourceAdded: (state, action) => {
			state.pending = false;
			state.value[action.payload.id] = action.payload.source;
		},
		// update the whole item:
		// sourceUpdated: (state, action) => {
		// 	state.pending = false;
		// 	state.value[action.payload.id] = action.payload.source;
		// },
		// sourceDeleted: (state, action) => {
		// 	state.pending = false;
		// 	delete state.value[action.payload.id];
		// },
		//=========== RESET ITEMS STATE =======================/
		resetSources: (state) => {
			state.value = {};
			state.pending = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	startPending,
	stopPending,
	sourcesFetched,
	sourceAdded,
	// sourceUpdated,
	// sourceDeleted,
	resetSources,
} = sourcesSlice.actions;

export default sourcesSlice.reducer;
