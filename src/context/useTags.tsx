"use client";
import { rtdb } from "@/firebaseConfig";
import {
	ref,
	onChildAdded,
	onChildChanged,
	onChildRemoved,
	onValue,
	get,
	query,
	startAfter,
	orderByKey,
	orderByValue,
	DatabaseReference,
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
import userStorageObject, { UserStorageObject } from "@/lib/userStorageObject";
import { addTag, deleteTag, updateTag } from "@/lib/crud/tags";
import date from "@/lib/date";

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

	const fetchTagsNum = (userId: string) => {
		const tagsNumRef = ref(rtdb, `users/${userId}/tagsNum`);
		onValue(tagsNumRef, (snapshot) => {
			if (!snapshot.exists()) return;
			const tagsNum = snapshot.val() as number;
			console.log("DATA WAS FETCHED (onValue): tagsNum updated:", tagsNum);
			setTagsNum(tagsNum);
		});
	};

	const fetchUpdatedTags = async (userId: string, updatedAt: number) => {
		const updatedRef = ref(rtdb, `events/${userId}/tags/updated`);
		const updatedQuery = query(
			updatedRef,
			orderByValue(),
			startAfter(updatedAt)
		);
		const updatedSnapshot = await get(updatedQuery);

		const updatedTags: { [tagId: string]: number } = {};
		if (updatedSnapshot.exists()) {
			const updatedEvents = updatedSnapshot.val() as {
				[tagId: string]: number;
			};
			console.log("Updated events fetched:", updatedEvents);
			Object.keys(updatedEvents).forEach((tagId) => {
				updatedTags[tagId] = updatedEvents[tagId];
			});
		}
		return updatedTags;
	};

	const fetchRemovedTags = async (userId: string, updatedAt: number) => {
		const removedRef = ref(rtdb, `events/${userId}/tags/removed`);
		const removedQuery = query(
			removedRef,
			orderByValue(),
			startAfter(updatedAt)
		);
		const removedSnapshot = await get(removedQuery);

		const removedTags: { [tagId: string]: number } = {};
		if (removedSnapshot.exists()) {
			const removedEvents = removedSnapshot.val() as {
				[tagId: string]: number;
			};
			console.log("Removed events fetched:", removedEvents);
			Object.keys(removedEvents).forEach((tagId) => {
				removedTags[tagId] = removedEvents[tagId];
			});
		}
		return removedTags;
	};

	const fetchTagsByKeys = async (keys: string[], userId: string) => {
		const fetchedTags: { [key: string]: Tag } = {};
		for (const key of keys) {
			const tagRef = generateItemRef("tags", userId, key);
			const snapshot = await get(ref(rtdb, tagRef));
			if (snapshot.exists()) {
				fetchedTags[key] = snapshot.val();
			}
		}
		return fetchedTags;
	};

	const fetchNewTags = async (
		tagsRef: DatabaseReference,
		lastKey: string | undefined
	) => {
		const newTagsQuery = lastKey
			? query(tagsRef, orderByKey(), startAfter(lastKey))
			: tagsRef;
		const newTagsSnapshot = await get(newTagsQuery);
		const newTags = newTagsSnapshot.exists()
			? (newTagsSnapshot.val() as Tags)
			: {};
		console.log("New tags fetched:", newTags);
		return newTags;
	};

	const updateUserStorage = (
		userId: string,
		updatedTags: Tags,
		updatedAt: number
	) => {
		console.log("User storage was updated at:", updatedAt);
		const prevUserStorageObj = userStorageObject.get(userId)!;
		const updatedUserStorageObj = {
			...prevUserStorageObj,
			updatedAt,
			tags: updatedTags,
		};
		userStorageObject.set(updatedUserStorageObj, userId);
	};

	const fetchTagsAndListenToChanges = useCallback(
		async (reference: string, userId: string) => {
			if (!user) return;
			fetchTagsNum(userId);

			const tagsRef = ref(rtdb, reference);
			let lastKey: string | undefined = undefined;

			if (userStorageObject.get(userId)) {
				const userStorageObj = userStorageObject.get(userId)!;
				console.log(
					`There is userStorageObj created at ${new Date(
						userStorageObj.createdAt
					)} and lastly updated at ${new Date(
						userStorageObj.updatedAt
					)}. Checking for updates...`
				);

				const updatedTags = await fetchUpdatedTags(
					userId,
					userStorageObj.updatedAt
				);
				const removedTags = await fetchRemovedTags(
					userId,
					userStorageObj.updatedAt
				);
				const newTags = await fetchNewTags(
					tagsRef,
					Object.keys(userStorageObj.tags).pop()
				);

				const updatedStorageObj = {
					...userStorageObj,
					tags: { ...userStorageObj.tags, ...newTags },
				};

				Object.keys(removedTags).forEach((tagId) => {
					delete updatedStorageObj.tags[tagId];
				});

				const updatedTagsData = await fetchTagsByKeys(
					Object.keys(updatedTags),
					userId
				);
				Object.keys(updatedTagsData).forEach((tagId) => {
					updatedStorageObj.tags[tagId] = updatedTagsData[tagId];
				});

				updateUserStorage(
					user.uid,
					updatedStorageObj.tags,
					date.getTimestamp()
				);

				lastKey = Object.keys(updatedStorageObj.tags).pop();
				setTags(updatedStorageObj.tags);
			} else {
				console.log(
					"There is no userStorageObject stored. Fetching tags from RTDB & populating userStorageObject..."
				);
				const fetchedTagsSnapshot = await get(tagsRef);
				if (fetchedTagsSnapshot.exists()) {
					const fetchedTags = fetchedTagsSnapshot.val() as Tags;
					const timestamp = date.getTimestamp();

					const newUserStorageObject: UserStorageObject = {
						createdAt: timestamp,
						tags: fetchedTags,
						updatedAt: timestamp,
						userId,
					};
					userStorageObject.set(newUserStorageObject, userId);
					lastKey = Object.keys(newUserStorageObject.tags).pop();
					setTags(fetchedTags);
				}
			}

			const queryForNewAddedTags = lastKey
				? query(tagsRef, orderByKey(), startAfter(lastKey))
				: tagsRef;
			console.log("Listening for new tags after key:", lastKey);

			onChildAdded(queryForNewAddedTags, (snapshot) => {
				const newTag = snapshot.val() as Tag;
				console.log("New tag was added to RTDB:", newTag);

				setTags((prevTags) => {
					const updatedTags = { ...prevTags, [snapshot.key!]: newTag };
					updateUserStorage(userId, updatedTags, newTag.createdAt.auto);
					return updatedTags;
				});
			});

			onChildChanged(tagsRef, (snapshot) => {
				const updatedTag = snapshot.val();
				console.log(
					"DATA WAS FETCHED (onChildChanged): tag updated:",
					updatedTag
				);

				setTags((prevTags) => {
					const updatedTags = { ...prevTags, [snapshot.key!]: updatedTag };
					updateUserStorage(userId, updatedTags, updatedTag.updatedAt);
					return updatedTags;
				});
			});

			onChildRemoved(tagsRef, (snapshot) => {
				const timestamp = date.getTimestamp();
				const removedTag = snapshot.val() as Tag;
				console.log(
					"DATA WAS FETCHED (onChildRemoved): tag removed:",
					removedTag
				);
				setTags((prevTags) => {
					const updatedTags = { ...prevTags };
					delete updatedTags[snapshot.key!];
					updateUserStorage(userId, updatedTags, timestamp);
					return updatedTags;
				});
			});
		},
		[user]
	);

	useEffect(() => {
		if (!user) {
			setTags(null);
		} else {
			const tagsRef = generateItemsRef("tags", user.uid);
			fetchTagsAndListenToChanges(tagsRef, user.uid);
		}
	}, [fetchTagsAndListenToChanges, user]);

	useEffect(() => {
		console.log("tags:", tags);
	}, [tags]);

	const value = {
		tags,
		tagsNum,
		setTags,
		getTagById,
		getTagNotesNum,
		addTag: async (value: string) => addTag({ user, value }),
		updateTag: async (value: string, id: string) =>
			updateTag({ user, value, id, prevTag: getTagById(id) }),
		deleteTag: async (tag: Tag) => deleteTag(tag, user),
	};

	return <TagsContext.Provider value={value}>{children}</TagsContext.Provider>;
}
