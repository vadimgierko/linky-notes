import { rtdb } from "@/firebaseConfig";
import date from "@/lib/date";
import generateFirebaseKeyFor from "@/lib/generateFirebaseKeyFor";
import { generateItemRef } from "@/lib/generateItemsRef";
import { Tag } from "@/types";
import { User } from "firebase/auth";
import { increment, ref, update } from "firebase/database";

export async function addTag({
	user,
	value,
}: {
	user: User | null;
	value: string;
}) {
	// CHECKS:
	if (!user) {
		console.error("Cannot set tag when user is not logged...");
		return null;
	}

	if (!value.trim().length) {
		console.error("Your tag has no value! Cannot set the tag...");
		return null;
	}

	const timestamp = date.getTimestamp();
	const tagId = generateFirebaseKeyFor("tags", user.uid);

	if (!tagId) return console.error("Cannot generate tag id...");

	const tagRef = generateItemRef("tags", user.uid, tagId);

	const newTag: Tag = {
		id: tagId,
		createdAt: { auto: timestamp },
		updatedAt: timestamp,
		value,
		userId: user.uid,
	};

	const updates: {
		[key: string]: Tag | object;
	} = {};

	updates[tagRef] = newTag;

	const tagsNumRef = `users/${user.uid}/tagsNum`;
	updates[tagsNumRef] = increment(1);

	await update(ref(rtdb), updates);
}

export async function updateTag({
	user,
	id,
	value,
	prevTag,
}: {
	user: User | null;
	id: string;
	value: string;
	prevTag: Tag | null;
}) {
	// CHECKS:
	if (!user) {
		console.error("Cannot set tag when user is not logged...");
		return null;
	}

	if (!value.trim().length) {
		console.error("Your tag has no value! Cannot set the tag...");
		return null;
	}

	const timestamp = date.getTimestamp();
	const tagRef = generateItemRef("tags", user.uid, id);

	const updatedTagProps: {
		updatedAt: Tag["updatedAt"];
		value: Tag["value"];
	} = {
		updatedAt: timestamp,
		value,
	};

	const updates: {
		[key: string]: Tag | number;
	} = {};

	if (!prevTag) {
		console.error("Tag with this id does not exist...");
		return null;
	}

	updates[tagRef] = {
		...prevTag,
		...updatedTagProps,
	};

	// update events:
	const eventsRef = `events/${user.uid}/tags/updated/${id}`;
	updates[eventsRef] = updatedTagProps.updatedAt;

	await update(ref(rtdb), updates);
}

export async function deleteTag(tag: Tag, user: User | null) {
	// CHECKS:
	if (!user) {
		const msg = "Cannot set tag when user is not logged...";
		console.error(msg);
		alert(msg);
		return;
	}

	if (tag.notes) {
		const msg =
			"Cannot delete tag with notes assigned... Remove the tag from it's notes, than try to delete the tag.";
		console.error(msg);
		alert(msg);
		return;
	}

	const updates: { [key: string]: Tag | null | object | number } = {};

	// remove tag:
	updates[generateItemRef("tags", user.uid, tag.id)] = null;
	// update tagsNum:
	const tagsNumRef = `users/${user.uid}/tagsNum`;
	updates[tagsNumRef] = increment(-1);
	// update events:
	const eventsRef = `events/${user.uid}/tags/removed/${tag.id}`;
	updates[eventsRef] = date.getTimestamp();
	// remove if was in updated:
	updates[`events/${user.uid}/tags/updated/${tag.id}`] = null;

	await update(ref(rtdb), updates);
}
