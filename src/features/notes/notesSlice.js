import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: {}, // items are stored in object under the unique firebase key (id)
	pending: false, // pending = true when the data is fetching, deleting, adding or updating
};

export const notesSlice = createSlice({
	name: "items",
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
		notesFetched: (state, action) => {
			//state.pending = false; // no need, because there is stopPending() in the thunk
			state.value = action.payload;
		},
		//=========================== ITEM CRUD =================================//
		// noteFetched: (state, action) => {
		// 	state.pending = false;
		// 	state.value[action.payload.id] = action.payload.note;
		// },
		noteAdded: (state, action) => {
			state.pending = false;
			state.value[action.payload.id] = action.payload.note;
		},
		// update the whole item:
		noteUpdated: (state, action) => {
			state.pending = false;
			state.value[action.payload.id] = action.payload.note;
		},
		noteDeleted: (state, action) => {
			state.pending = false;
			delete state.value[action.payload.id];
		},
		//======================== MORE SPECIFIC ACTIONS ========================//
		// this is the example of more specific update action:
		// update item value:
		// noteContentUpdated: (state, action) => {
		// 	state.pending = false;
		// 	const note = state.value[action.payload.id];
		// 	note.content = action.payload.content;
		// },
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
	notesFetched,
	noteFetched,
	noteAdded,
	noteUpdated,
	noteDeleted,
	noteContentUpdated,
	resetState,
} = notesSlice.actions;

export default notesSlice.reducer;
