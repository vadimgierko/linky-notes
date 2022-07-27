import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
//import itemsReducer from "../features/items/itemsSlice";

export default configureStore({
	reducer: {
		user: userSlice,
		//items: itemsReducer,
	},
});
