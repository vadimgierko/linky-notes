"use client"

import useTags from "@/context/useTags";
import { Tag as ITag } from "@/types";
import Link from "next/link";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Tag from "../Tag";
import TagWithTrashIcon from "../TagWithTrashIcon";

interface TagsSearchBarProps {
    selectedTags: string | null;
    modifiesUrl: boolean;
    sortBy: "lastUpdated" | "firstUpdated" | "lastCreated" | "firstCreated"
}

export default function TagsSearchBar({ selectedTags, modifiesUrl, sortBy }: TagsSearchBarProps) {
    const { tags } = useTags();

    const [input, setInput] = useState<string>("");
    const [foundTags, setFoundTags] = useState<{ [key: string]: ITag }>({})

    return (
        <div className="tags-search-bar">
            <Form.Control
                className="form-control mb-2"
                value={input}
                placeholder="type some tag to filter your notes & click found tag"
                onChange={(e) => {
                    const changedInput = e.target.value;
                    setInput(changedInput);
                    //=============================================
                    // when user types, set found tags to show them:
                    if (changedInput && changedInput.length) {
                        if (tags && Object.keys(tags).length) {
                            const foundTagsId = Object.keys(tags).filter((id) =>
                                tags[id].tag.startsWith(changedInput)
                            );
                            if (foundTagsId.length) {
                                let updatedfoundTags = {};
                                foundTagsId.forEach(
                                    (id) =>
                                    (updatedfoundTags = {
                                        ...updatedfoundTags,
                                        [id]: tags[id],
                                    })
                                );
                                setFoundTags(updatedfoundTags);
                            }
                        }
                    } else {
                        // if input is cleared:
                        setFoundTags({});
                    }
                }}
            />

            {/*======================================== found tags */}
            <div className="found-tags">
                {Object.keys(foundTags).map((id) => modifiesUrl
                    ? <Link
                        href={`/?tags=${selectedTags ? selectedTags + "+" + id : id}&sortBy=${sortBy}`}
                        key={id}
                    >
                        <Tag
                            value={tags![id].tag} // 🚀❗ fix using !
                            onClick={() => {
                                // clear found tags:
                                setFoundTags({});
                                // clear input:
                                setInput("");
                            }}
                        />
                    </Link>
                    : <Tag
                        key={id}
                        value={tags![id].tag} // 🚀❗ fix using !
                        onClick={() => {
                            // 🚀❗ TODO: modify note tags❗
                            // clear found tags:
                            setFoundTags({});
                            // clear input:
                            setInput("");
                        }}
                    />
                )}
            </div>

            {/*======================================== filter tags */}
            {(selectedTags && tags) ? (
                <div className="filter-tags">
                    {modifiesUrl
                        ? selectedTags
                            .split(" ") // "+"
                            .map((filterTagId) => {
                                const updatedParamsString = selectedTags
                                    .split(" ")  // "+"
                                    .filter((id) => filterTagId !== id)
                                    .join("+");

                                const filterTagLink = updatedParamsString
                                    ? `/?tags=${updatedParamsString}&sortBy=${sortBy}`
                                    : `/?sortBy=${sortBy}`

                                return (
                                    <Link
                                        href={filterTagLink}
                                        key={filterTagId}
                                    >
                                        <TagWithTrashIcon
                                            tag={tags[filterTagId]}
                                        />
                                    </Link>
                                )
                            })
                        : null
                    }
                </div>
            ) : (
                <div className="filter-tags mb-2">There are no filter tags...</div>
            )}
        </div>
    )
}