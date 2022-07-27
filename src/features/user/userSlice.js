import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: {
		email: "",
		id: "",
	},
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		userSignedIn: (state, action) => {
			state.value.email = action.payload.email;
			state.value.id = action.payload.id;
		},
		userLoggedOut: (state) => {
			state.value.email = "";
			state.value.id = "";
		},
	},
});

// Action creators are generated for each case reducer function
export const { userSignedIn, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
