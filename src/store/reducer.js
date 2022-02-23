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
		case "set-user-data":
			return {
				...state,
				userData: {
					...action.payload,
				},
			};
		case "set-user-items-list":
			return {
				...state,
				userItemsList: action.payload,
			};
		case "add-item":
			return {
				...state,
				userItemsList: {
					...state.userItemsList,
					[action.payload.key]: {
						title: action.payload.item.title,
					},
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
			// delete item from userItemsList object copy:
			let items = { ...state.userItemsList };
			delete items[action.payload.key];
			// delete item from fetchedItems object copy:
			// CHECK IF FETCHED ITEMS TRUE ???
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
				userItemsList: items,
			};
		case "reset-state":
			return INIT_STATE;
		default:
			return state;
	}
}
