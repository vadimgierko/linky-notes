"use client";
import { rtdb } from "@/firebaseConfig";
import {
	ref,
	update,
	onChildAdded,
	onChildChanged,
	onChildRemoved,
	increment,
	onValue,
	get,
	query,
	startAfter,
	orderByKey,
} from "firebase/database";
import {
	createContext,
	Dispatch,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import useUser from "./useUser";
import { Tag, Tags } from "@/types";
import { generateItemRef, generateItemsRef } from "@/lib/generateItemsRef";
import date from "@/lib/date";
import generateFirebaseKeyFor from "@/lib/generateFirebaseKeyFor";

const TagsContext = createContext<{
	tags: Tags | null;
	tagsNum: number;
	setTags: Dispatch<SetStateAction<Tags | null>>;
	getTagById: (id: string) => Tag | null;
	getTagNotesNum: (tagId: string) => number;
	addTag(value: string): Promise<void | null>;
	updateTag: (value: string, id: string) => Promise<null | undefined>;
	deleteTag: (tag: Tag) => Promise<void>;
} | null>(null);

export default function useTags() {
	const context = useContext(TagsContext);

	if (!context) {
		throw new Error("useTags has to be used within <TagsContext.Provider>");
	}

	return context;
}

interface TagsProviderProps {
	children: React.ReactNode;
}

export function TagsProvider({ children }: TagsProviderProps) {
	const { user } = useUser();
	const [tags, setTags] = useState<Tags | null>(null);
	const [tagsNum, setTagsNum] = useState<number>(0);

	function getTagById(id: string) {
		if (!tags) return null;
		return tags[id];
	}

	function getTagNotesNum(tagId: string) {
		if (!tags || !tags[tagId] || !tags[tagId].notes) return 0;
		return Object.keys(tags[tagId].notes).length;
	}

	async function addTag(value: string) {
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

	async function updateTag(value: string, id: string) {
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
			[key: string]: Tag;
		} = {};

		const prevTag = getTagById(id);

		if (!prevTag) {
			console.error("Tag with this id does not exist...");
			return null;
		}

		updates[tagRef] = {
			...prevTag,
			...updatedTagProps,
		};

		await update(ref(rtdb), updates);
	}

	async function deleteTag(tag: Tag) {
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

		const updates: { [key: string]: Tag | null | object } = {};

		// remove tag:
		updates[generateItemRef("tags", user.uid, tag.id)] = null;
		// update tagsNum:
		const tagsNumRef = `users/${user.uid}/tagsNum`;
		updates[tagsNumRef] = increment(-1);

		await update(ref(rtdb), updates);
	}

	const fetchTagsAndListenToChanges = useCallback(
		async (reference: string, userId: string) => {
			// fetch tags num first:
			const tagsNumRef = ref(rtdb, `users/${userId}/tagsNum`);
			onValue(tagsNumRef, (snapshot) => {
				if (!snapshot.exists()) return;

				const tagsNum = snapshot.val() as number;
				console.log("DATA WAS FETCHED (onValue): tagsNum updated:", tagsNum);
				setTagsNum(tagsNum);
			});

			// now the rest...
			const tagsRef = ref(rtdb, reference);

			let lastKey: string | undefined = undefined;

			if (
				// check if user is the same as the one stored in sessionStorage:
				sessionStorage.getItem("linky_notes_user_id") === userId &&
				// check if tags were already fetched:
				sessionStorage.getItem("linky_notes_user_tags")
			) {
				console.log(
					"User tags are already in sessionStorage. No need to fetch them again."
				);
				const tagsStoredInSessionStorage = JSON.parse(
					sessionStorage.getItem("linky_notes_user_tags")!
				);
				lastKey = Object.keys(tagsStoredInSessionStorage).pop();
				setTags(tagsStoredInSessionStorage);
			} else {
				console.log(
					"There are no user tags stored in sessionStorage. Fetching tags from RTDB..."
				);
				const fetchedTagsSnapshot = await get(tagsRef);

				if (fetchedTagsSnapshot.exists()) {
					const fetchedTags = fetchedTagsSnapshot.val() as Tags;
					setTags(fetchedTags);
					lastKey = Object.keys(fetchedTags).pop();
					// save tags to sessionStorage:
					sessionStorage.setItem(
						"linky_notes_user_tags",
						JSON.stringify(fetchedTags)
					);
				}
			}

			// attach listeners to listen to changes in tags:
			const queryForNewAddedTags = lastKey
				? query(tagsRef, orderByKey(), startAfter(lastKey))
				: tagsRef;

			console.log(lastKey, queryForNewAddedTags);

			onChildAdded(queryForNewAddedTags, (snapshot) => {
				const newTag = snapshot.val() as Tag;
				console.log("New tag was added to RTDB:", newTag);
				setTags((prevTags) => {
					const updatedTags = { ...prevTags, [snapshot.key!]: newTag };
					// save tags to sessionStorage:
					sessionStorage.setItem(
						"linky_notes_user_tags",
						JSON.stringify(updatedTags)
					);
					return updatedTags;
				});
			});

			onChildChanged(tagsRef, (snapshot) => {
				const updatedTag = snapshot.val() as Tag;
				console.log(
					"DATA WAS FETCHED (onChildChanged): tag updated:",
					updatedTag
				);
				setTags((prevTags) => {
					const updatedTags = { ...prevTags, [snapshot.key!]: updatedTag };
					// save tags to sessionStorage:
					sessionStorage.setItem(
						"linky_notes_user_tags",
						JSON.stringify(updatedTags)
					);
					return updatedTags;
				});
				setTags((prevTags) => ({ ...prevTags, [snapshot.key!]: updatedTag }));
			});

			onChildRemoved(tagsRef, (snapshot) => {
				console.log(
					"DATA WAS FETCHED (onChildRemoved): tag removed:",
					snapshot.val()
				);
				setTags((prevTags) => {
					const updatedTags = { ...prevTags };
					delete updatedTags[snapshot.key!];
					// save tags to sessionStorage:
					sessionStorage.setItem(
						"linky_notes_user_tags",
						JSON.stringify(updatedTags)
					);
					return updatedTags;
				});
			});
		},
		[]
	);

	useEffect(() => {
		if (!user) {
			setTags(null);
			// remove tags from sessionStorage:
			// sessionStorage.removeItem("linky_notes_user_tags");
		} else {
			const tagsRef = generateItemsRef("tags", user.uid);
			fetchTagsAndListenToChanges(tagsRef, user.uid);
		}
	}, [fetchTagsAndListenToChanges, user]);

	const value = {
		tags,
		tagsNum,
		setTags,
		getTagById,
		getTagNotesNum,
		addTag,
		updateTag,
		deleteTag,
	};

	return <TagsContext.Provider value={value}>{children}</TagsContext.Provider>;
}
