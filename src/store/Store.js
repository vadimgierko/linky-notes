import { createContext, useContext, useEffect, useReducer } from "react";
import { firebaseAuth } from "../firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import reducer from "./reducer.js";
import { INIT_STATE } from "./initState.js";
import fetchItems from "../logic/fetchItems.js";
import fetchTags from "../logic/fetchTags.js";
//======= NOTE: THIS BELOW IS EXPERIMENTAL !!! DON'T USE IT, UNTIL I REMOVE THIS COMMENT:
import fetchFromDatabase from "../logic/fetch/fetchFromDatabase.js";
//=====================================================================================//

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export function StoreProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, INIT_STATE);

	useEffect(() => {
		onAuthStateChanged(firebaseAuth, (user) => {
			if (user) {
				console.log("DATA WAS FETCHED: USER CREDENTIALS");
				dispatch({
					type: "set-user",
					payload: { id: user.uid, email: user.email },
				});
				console.log("User logged in. User:", user);

				//================================== OFF FOR TESTS:
				fetchItems(user.uid, dispatch);
				fetchTags(user.uid, dispatch);
				//================================================//

				// this below is used to fetch sources (experimental feature, don't use it)
				fetchFromDatabase("sources", user.uid, dispatch);
				fetchFromDatabase("authors", user.uid, dispatch);
			} else {
				dispatch({ type: "reset-state" });
				console.log("User is logged out. Store was reset.");
			}
		});
	}, []);

	const value = {
		state,
		dispatch,
	};

	return (
		<StoreContext.Provider value={value}>{children}</StoreContext.Provider>
	);
}
