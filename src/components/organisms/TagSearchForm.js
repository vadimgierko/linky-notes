import { useEffect, useState } from "react";
import TagButtonWithTrashIcon from "../atoms/TagButtonWithTrashIcon";
import TagButton from "../atoms/TagButton";
import { useTheme } from "../../hooks/use-theme";

export default function TagSearchForm({ tags, chosenTags, setChosenTags }) {
  const { theme } = useTheme();
  const [inputedTagValue, setInputedTagValue] = useState("");
  const [availableTags, setAvailableTags] = useState(null);

  function deleteTag(tag) {
    const updatedTags = chosenTags.filter((item) => item !== tag);
    setChosenTags(updatedTags);
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
    <div
      style={{ background: theme.background, color: theme.color }}
    >
      <input
        type="text"
        className={"form-control mb-2 + bg-" + theme.mode + " text-" + (theme.mode === "dark" ? "light" : "dark")}
        defaultValue={inputedTagValue}
        placeholder="type some tag"
        onChange={(e) => setInputedTagValue(e.target.value)}
      />
      {chosenTags && chosenTags.length
        ? chosenTags.map((tag) => (
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
            setChosenTags([...chosenTags, inputedTagValue]);
            setInputedTagValue("");
          }}
        />
      ) : null}
      {inputedTagValue && availableTags.length
        ? availableTags.map((tag, i) => (
            <TagButton
              key={tag}
              tag={tag}
              onClick={() => {
                setChosenTags([...chosenTags, tag]);
                setInputedTagValue("");
              }}
            />
          ))
        : null}
    </div>
  );
}
