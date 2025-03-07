import { Tags } from "@/types";

export interface UserStorageObject {
	createdAt: number;
	tags: Tags;
	updatedAt: number;
	userId: string;
}

function generateUserLocalStorageRef(userId: string) {
	return `linky_notes_user_storage_object_${userId}`;
}

/**
 * This can be used with `localStorage` or `sessionStorage` -
 * just change `localStorage` <-> `sessionStorage`
 */
const userStorageObject = {
	get: (userId: string) => {
		const s = localStorage.getItem(generateUserLocalStorageRef(userId));

		if (s) {
			return JSON.parse(s) as UserStorageObject;
		} else {
			return null;
		}
	},
	set: (updatedObj: UserStorageObject, userId: string) => {
		return localStorage.setItem(
			generateUserLocalStorageRef(userId),
			JSON.stringify(updatedObj)
		);
	},
};

export default userStorageObject;
