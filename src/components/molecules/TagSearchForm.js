import { useEffect, useState } from "react";
import TagButtonWithTrashIcon from "../atoms/TagButtonWithTrashIcon";
import TagButton from "../atoms/TagButton";

export default function TagSearchForm({tags, filterTags, setFilterTags}) {
    const [inputedTagValue, setInputedTagValue] = useState("");
    const [availableTags, setAvailableTags] = useState(null);

    function deleteTag(tag) {
        const updatedTags = filterTags.filter((item) => item !== tag);
        setFilterTags(updatedTags);
    }

    function generateAvailableTags(input) {
        let availableTags = [];
        for (let i = 0; i < tags.length; i++) {
            const tag = tags[i];
            let sameLettersNum = 0;
            for (let n = 0; n < input.length; n++) {
                if (input[n] === tag[n]) {
                    // check every letter in order
                    sameLettersNum++;
                    // if it's the same, put tag into array
                    if (sameLettersNum === input.length) {
                        const isThisTagInArrayAlready = availableTags.find(
                            (availableTag) => availableTag === tag
                        );
                        if (!isThisTagInArrayAlready) {
                            availableTags.push(tag);
                        }
                    }
                }
            }
        }
        return availableTags;
    }

    useEffect(() => {
        setAvailableTags(generateAvailableTags(inputedTagValue));
    }, [inputedTagValue]);

    return (
        <div>
            <input
                type="text"
                className="form-control mb-2"
                defaultValue={inputedTagValue}
                placeholder="type some tag to search for notes"
                onChange={(e) => setInputedTagValue(e.target.value)}
            />
            {filterTags && filterTags.length
                ?   filterTags.map((tag) => (
                        <TagButtonWithTrashIcon
                            key={tag}
                            tag={tag}
                            onTrashIconClick={() => deleteTag(tag)}
                        />
                    ))
                : null}
            {inputedTagValue ? (
                <TagButton
                    tag={inputedTagValue}
                    onClick={() => {
                        setFilterTags([...filterTags, inputedTagValue]);
                    }}
                />
            ) : null}
            {inputedTagValue && availableTags.length
                ?   availableTags.map((tag, i) => (
                        <TagButton
                            key={tag}
                            tag={tag}
                            onClick={() => {
                                setFilterTags([...filterTags, tag]);
                                setInputedTagValue("");
                            }}
                        />
                    ))
                : null}
        </div>
    );
}