"use client";
import NoteCard from "@/components/NoteCard";
import PrivateRoute from "@/components/PrivateRoute";
import useNotes from "@/context/useNotes";
import useTags from "@/context/useTags";
import sortNotes from "@/lib/sortNotes";
import sortTagsAlphabetically from "@/lib/sortTagsAlphabetically";
import { SortBy, Tag as ITag, Note, Tags } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Tag from "../Tag";
import TagWithTrashIcon from "../TagWithTrashIcon";

export default function NotesSearch({closeModal}: {closeModal: () => void}) {
    const {
        notes,
        notesNum,
        getNoteById,
        fetchAndListenToNotes: fetchNotes,
    } = useNotes();

    const { tags } = useTags();

    const fetchAndListenToNotes = useCallback(
        (ids: string[]) => fetchNotes(ids),
        [fetchNotes]
    );

    const debouncedSetFoundTags = useRef<NodeJS.Timeout | null>(null);

    const [input, setInput] = useState("");

    //======================== searchTags => filteredNotes ========================//
    const [sortBy, setSortBy] = useState<SortBy>("lastUpdated");
    const [foundTags, setFoundTags] = useState<Tags>({});
    const foundTagsSortedAlphabetically = sortTagsAlphabetically(foundTags);
    const [searchTags, setSearchTags] = useState<ITag[]>([]);

    function filterNotesIds() {
        let filteredNotesIds: string[] = [];

        searchTags.forEach((tag) => {
            // if any of tags has got no notes, reset filteredNotesIds & break the loop:
            if (!tag || !tag.notes) {
                filteredNotesIds = [];
                return;
            }

            // if tag has got notes ids & filteredNotesIds are empty, push ids:
            if (!filteredNotesIds.length) {
                filteredNotesIds.push(...Object.keys(tag.notes));
            }

            if (searchTags.length > 1) {
                // now with the every next tag keep only notes id that are common:
                const mutualNoteIds = Object.keys(tag.notes).filter((id) =>
                    filteredNotesIds.includes(id)
                );
                filteredNotesIds = mutualNoteIds;
            }
        });

        return filteredNotesIds;
    }

    const filteredNotesIds = filterNotesIds();

    const filteredNotesIdsToFetch = filteredNotesIds.filter(
        (id) => !getNoteById(id)
    );
    //==========================================================================================//
    // console.log("filteredNotesIds:", filteredNotesIds)
    const filteredNotes: Note[] = notes
        ? (filteredNotesIds
            .map((noteId) => getNoteById(noteId))
            .filter((note) => note) as Note[])
        : [];
    // console.log("filteredNotes:", filteredNotes)

    const filteredAndSortedNotes = sortNotes(
        filteredNotes,
        sortBy as SortBy
    ); // ⚠️ note object consists noteId

    useEffect(() => {
        if (filteredNotesIdsToFetch.length) {
            fetchAndListenToNotes(filteredNotesIdsToFetch);
        }
    }, [fetchAndListenToNotes, filteredNotesIdsToFetch]);

    return (
        <PrivateRoute>
            <header>
                <h1 className="text-center">
                    Filtered Notes ({filteredAndSortedNotes.length}/
                    {notesNum ? notesNum : 0})
                </h1>
            </header>

            {/*================== search bar ==================*/}
            <Form.Control
                className="form-control mb-2"
                value={input}
                placeholder="type something to search tags..."
                onChange={(e) => {
                    const changedInput = e.target.value;
                    setInput(changedInput);

                    // clear prev debounce timer:
                    if (debouncedSetFoundTags.current) {
                        clearTimeout(debouncedSetFoundTags.current);
                    }

                    // reassign debounce timer:
                    debouncedSetFoundTags.current = setTimeout(() => {
                        // console.log("debouncing input")
                        // when user types, set found tags to show them:

                        if (changedInput && changedInput.length) {
                            if (tags && Object.keys(tags).length) {
                                const foundTags: ITag[] = Object.values(tags).filter((tag) =>
                                    tag.value.toLowerCase().startsWith(changedInput.toLowerCase())
                                );

                                setFoundTags(
                                    foundTags.reduce(
                                        (prev, curr) => ({ ...prev, [curr.id]: curr }),
                                        {} as Tags
                                    )
                                );
                            }
                        } else {
                            // if input is cleared:
                            setFoundTags({});
                        }
                    }, 500);
                }}
            />

            <div className="tags-search-bar__found-tags">
                {
                    foundTagsSortedAlphabetically
                        .map((tag) =>
                            <Tag
                                key={tag.id}
                                value={tag.value}
                                onClick={() => {
                                    setSearchTags(prev => [...prev, tag]);
                                    // clear found tags:
                                    setFoundTags({});
                                    // clear input:
                                    setInput("");
                                }}
                            />
                        )
                }
            </div>

            <div className="tags-search-bar__search/selected-tags">
                {
                    searchTags
                        .map((tag) =>
                            <TagWithTrashIcon
                                key={tag.id}
                                tag={tag}
                                onClick={() =>
                                    setSearchTags(prev =>
                                        prev.filter(t => t.id !== tag.id))
                                }
                            />
                        )
                }
            </div>

            {/** SORT */}
            <div className="sort">
                <select
                    className="form-control mb-2"
                    onChange={(e) =>
                        setSortBy(e.target.value as SortBy)
                    }
                    value={sortBy}
                >
                    <option value="lastUpdated">last updated</option>
                    <option value="firstUpdated">first updated</option>
                    <option value="lastCreated">last created</option>
                    <option value="firstCreated">first created</option>
                </select>
            </div>

            <div id="filtered-notes">
                {filteredAndSortedNotes.map((note) => (
                    <NoteCard
                        key={note.id}
                        note={note}
                        noteKey={note.id}
                        show140chars={true}
                        closeModal={closeModal}
                    />
                ))}
            </div>
        </PrivateRoute>
    );
}
