"use client";
import { rtdb } from "@/firebaseConfig";
import { ref, onValue, update, remove } from "firebase/database";
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
	isFetching: boolean;
	setTags: Dispatch<SetStateAction<Tags | null>>;
	getTagById: (id: string) => Tag | null;
	getTagNotesNum: (tagId: string) => number;
	updateTag: (value: string, id: string) => Promise<null | undefined>;
	deleteTag: (tag: Tag) => Promise<void>
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

	const [isFetching, setIsFetching] = useState(true);

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
			updatedAt: Tag["updatedAt"],
			tag: Tag["tag"]
		} = {
			updatedAt: date,
			tag: value
		}

		const updates: {
			[key: string]: Tag
		} = {}

		const prevTag = getTagById(id);

		updates[tagRef] = {
			...prevTag!,
			...updatedTagProps
		}

		await update(ref(rtdb), updates);

		setTags(prevTags => ({ ...prevTags, [id]: { ...prevTags![id], ...updatedTagProps } }))
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
			const msg = "Cannot delete tag with notes assigned... Remove the tag from it's notes, than try to delete the tag.";
			console.error(msg);
			alert(msg);
			return;
		}

		const tagRef = generateItemsRef("tags", user.uid) + "/" + tag.id;

		await remove(ref(rtdb, tagRef));

		setTags(prevTags => {
			const updatedTags = {...prevTags}
			delete updatedTags[tag.id];

			return updatedTags
		})
	}

	useEffect(() => {
		async function fetchTags(reference: string) {
			return onValue(
				ref(rtdb, reference),
				(snapshot) => {
					const data = snapshot.val() as Tags;
					console.log("DATA WAS FETCHED: ALL USER'S ITEMS FROM", reference);
					console.log("fetchedItems:", data);
					setTags(data);
					setIsFetching(false);
				},
				{
					onlyOnce: true,
				}
			);
		}

		if (!user) {
			setTags(null);
		} else {
			const tagsRef = generateItemsRef("tags", user.uid);
			fetchTags(tagsRef);
		}
	}, [user]);

	const value = {
		tags,
		tagsNum: tags ? Object.keys(tags).length : 0,
		isFetching,
		setTags,
		getTagById,
		getTagNotesNum,
		updateTag,
		deleteTag
	};

	return <TagsContext.Provider value={value}>{children}</TagsContext.Provider>;
}
