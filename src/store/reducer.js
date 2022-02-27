import { INIT_STATE } from "./initState";

export default function reducer(state, action) {
	switch (action.type) {
		case "set-user":
			return {
				...state,
				user: {
					...action.payload,
				},
			};
		case "set-fetched-items": // run, when all user items are fetched
			return {
				...state,
				fetchedItems: {
					...action.payload,
				},
			};
		case "add-fetched-item-to-fetched-items":
			return {
				...state,
				fetchedItems: {
					...state.fetchedItems,
					[action.payload.key]: action.payload.item,
				},
			};
		case "delete-item":
			let fetched = { ...state.fetchedItems };
			if (fetched[action.payload.key]) {
				delete fetched[action.payload.key];
			} else {
				console.log(
					"Deleted item wasn't in fetched items, so no need to delete it from there."
				);
			}
			//==================================
			return {
				...state,
				fetchedItems: fetched,
			};
		case "reset-state":
			return INIT_STATE;
		default:
			return state;
	}
}