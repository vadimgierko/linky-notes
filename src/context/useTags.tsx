"use client";
import { rtdb } from "@/firebaseConfig";
import {
	ref,
	update,
	remove,
	onChildAdded,
	onChildChanged,
	onChildRemoved,
} from "firebase/database";
import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import useUser from "./useUser";
import { Tag, Tags } from "@/types";
import generateItemsRef from "@/lib/generateItemsRef";
import createDate from "@/lib/createDate";

const TagsContext = createContext<{
	tags: Tags | null;
	tagsNum: number;
	setTags: Dispatch<SetStateAction<Tags | null>>;
	getTagById: (id: string) => Tag | null;
	getTagNotesNum: (tagId: string) => number;
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

	function getTagById(id: string) {
		if (!tags) return null;
		return tags[id];
	}

	function getTagNotesNum(tagId: string) {
		if (!tags || !tags[tagId] || !tags[tagId].notes) return 0;
		return Object.keys(tags[tagId].notes).length;
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

		const date = createDate();
		const tagRef = generateItemsRef("tags", user.uid) + "/" + id;

		const updatedTagProps: {
			updatedAt: Tag["updatedAt"];
			tag: Tag["tag"];
		} = {
			updatedAt: date,
			tag: value,
		};

		const updates: {
			[key: string]: Tag;
		} = {};

		const prevTag = getTagById(id);

		updates[tagRef] = {
			...prevTag!,
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

		const tagRef = generateItemsRef("tags", user.uid) + "/" + tag.id;
		await remove(ref(rtdb, tagRef));
	}

	useEffect(() => {
		function fetchTagsAndListenToChanges(reference: string) {
			const tagsRef = ref(rtdb, reference);

			onChildAdded(tagsRef, (snapshot) => {
				const newTag = snapshot.val() as Tag;
				console.log("New tag was added to RTDB:", newTag);
				setTags((prevTags) => ({ ...prevTags, [snapshot.key!]: newTag }));
			});

			onChildChanged(tagsRef, (snapshot) => {
				const updatedTag = snapshot.val() as Tag;
				console.log(
					"DATA WAS FETCHED (onChildChanged): tag updated:",
					updatedTag
				);
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
					return updatedTags;
				});
			});
		}

		if (!user) {
			setTags(null);
		} else {
			const tagsRef = generateItemsRef("tags", user.uid);
			fetchTagsAndListenToChanges(tagsRef);
		}
	}, [user]);

	const value = {
		tags,
		tagsNum: tags ? Object.keys(tags).length : 0,
		setTags,
		getTagById,
		getTagNotesNum,
		updateTag,
		deleteTag,
	};

	return <TagsContext.Provider value={value}>{children}</TagsContext.Provider>;
}
