"use client";
import { rtdb } from "@/firebaseConfig";
import { ref, onValue } from "firebase/database";
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

const TagsContext = createContext<{
	tags: Tags | null;
	isFetching: boolean;
	setTags: Dispatch<SetStateAction<Tags | null>>;
	getTagById: (id: string) => Tag | null;
	getTagNotesNum: (tagId: string) => number;
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
		isFetching,
		setTags,
		getTagById,
		getTagNotesNum,
	};

	return <TagsContext.Provider value={value}>{children}</TagsContext.Provider>;
}
