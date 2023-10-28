import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import notesSlice from "../features/notes/notesSlice";
import tagsSlice from "../features/tags/tagsSlice";

export default configureStore({
	reducer: {
		user: userSlice,
		notes: notesSlice,
		tags: tagsSlice,
	},
});
