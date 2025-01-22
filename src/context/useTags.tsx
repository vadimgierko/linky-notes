"use client";
import { rtdb } from "@/firebaseConfig";
import { ref, get } from "firebase/database";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import useUser from "./useUser";
import { Tag } from "@/types";

const TagsContext = createContext<{
    tags: {
        [key: string]: Tag;
    } | null;
    isFetching: boolean;
    setTags: Dispatch<SetStateAction<{
        [key: string]: Tag;
    } | null>>
    getTagById: (id: string) => Tag | null;
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
    const [tags, setTags] = useState<{ [key: string]: Tag } | null>(null);

    const [isFetching, setIsFetching] = useState(true);

    function getTagById(id: string) {
        if (!tags) return null;

        return tags[id];
    }

    useEffect(() => {
        async function fetchTags(reference: string) {
            try {
                const snapshot = await get(ref(rtdb, reference)); // => fetches all notes

                // const firstTenTagsRef = query(ref(rtdb, reference), limitToLast(100));
                // const snapshot = await get(firstTenTagsRef);

                if (snapshot.exists()) {
                    const data = snapshot.val() as { [key: string]: Tag };
                    console.log("DATA WAS FETCHED: ALL USER'S ITEMS FROM", reference);
                    console.log("fetchedItems:", data);
                    setTags(data);
                } else {
                    console.log("There are no items at", reference);
                    setTags(null);
                }
            } catch (error: unknown) {
                console.error(error);
                setTags(null);
            } finally {
                setIsFetching(false);
            }
        }

        if (!user) {
            setTags(null);
        } else {
            fetchTags("tags/" + user.uid);
        }
    }, [user]);

    const value = {
        tags,
        isFetching,
        setTags,
        getTagById
    };

    return (
        <TagsContext.Provider value={value}>{children}</TagsContext.Provider>
    );
}
