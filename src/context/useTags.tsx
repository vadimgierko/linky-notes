"use client";
import { rtdb } from "@/firebaseConfig";
import { ref, get, query, limitToLast } from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";
import useUser from "./useUser";
import { Note, Tag } from "@/types";
import useNotes from "./useNotes";

const TagsContext = createContext<{
    tags: { [key: string]: Tag } | null;
}>({ tags: null });

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
    const {notes} = useNotes();
    // filter tags from notes
    const tags = notes
    ? Object.keys(notes).reduce((cumulatedTags, noteId) => {
        const note = notes[noteId] 
        return {
            ...cumulatedTags,
            ...(note.tags ? note.tags : {}) // we do not check for unique tags, becuase it will be overwritten
        }
    }, {} as { [key: string]: Tag })
    : null
    
    const value = {
        tags,
    };

    return (
        <TagsContext.Provider value={value}>{children}</TagsContext.Provider>
    );
}
