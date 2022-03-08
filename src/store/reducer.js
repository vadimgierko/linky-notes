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
		case "set-items":
			return {
				...state,
				items: {
					...action.payload,
				},
			};
		case "add-item":
			return {
				...state,
				items: {
					...state.items,
					[action.payload.key]: action.payload.item,
				},
			};
		case "delete-item":
			let updatedItems = { ...state.items };
			if (updatedItems[action.payload.key]) {
				delete updatedItems[action.payload.key];
			}
			return {
				...state,
				items: updatedItems,
			};
		case "set-tags":
			return {
				...state,
				tags: {
					...action.payload,
				},
			};
		case "add-tag":
			return {
				...state,
				tags: {
					...state.tags,
					[action.payload.key]: { tag: action.payload.tag },
				},
			};
		case "reset-state":
			return INIT_STATE;
		default:
			return state;
	}
}
