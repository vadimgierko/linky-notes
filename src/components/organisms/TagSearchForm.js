import { useEffect, useState } from "react";
import TagButtonWithTrashIcon from "../atoms/TagButtonWithTrashIcon";
import FormTagButton from "../atoms/FormTagButton";
import TagButtonGeneratedByInput from "../atoms/TagButtonGeneratedByInput";
import { useTheme } from "../../hooks/use-theme";
import { Link } from "react-router-dom";

export default function TagSearchForm({
  tags,
  chosenTags,
  setChosenTags,
  searchLinkFromFilterTags,
  setSearchLinkFromFilterTags,
  form
  }) {
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

  function generateLinkAfterDeletionOfTag(tag) {
    const updatedTags = chosenTags.filter((item) => item !== tag);
    let link = "";
    if (updatedTags && updatedTags.length) {
      for (let i = 0; i < updatedTags.length; i++) {
        if (i === 0) {
          link = updatedTags[i];
        } else {
          link = link + "+" + updatedTags[i];
        }
      }
    }
    return link;
  }

  useEffect(() => {
    setAvailableTags(generateAvailableTags(inputedTagValue));
  }, [inputedTagValue]);

  return (
    <div>
      <input
        type="text"
        className={
          "form-control mb-2 + bg-" +
          theme.mode +
          " text-" +
          (theme.mode === "dark" ? "light" : "dark")
        }
        defaultValue={inputedTagValue}
        placeholder="type some tag"
        onChange={(e) => setInputedTagValue(e.target.value)}
      />
      {/** FOR NOTES SEARCH */}
      {!form && chosenTags && chosenTags.length
        ? chosenTags.map((tag) => {
          if (tag && tag.length) {
            return (
              <button
                key={"tag-btn-with-trash-icon-for-" + tag}
                type="button"
                className="btn btn-outline-secondary mb-2 me-2"
                style={{ borderRadius: 20 }}
              >
                {tag}{" "}
                <Link
                  to={"/search?name=" + generateLinkAfterDeletionOfTag(tag)}
                >
                  <i
                    className="bi bi-trash text-white m-2"
                    style={{
                      backgroundColor: "red",
                      cursor: "pointer"
                    }}
                  ></i>
                </Link>
              </button>
            )
          }
        })
        : null}
      {/** FOR FORM SEARCH */}
      {form && chosenTags && chosenTags.length
        ? chosenTags.map((tag) => (
            <TagButtonWithTrashIcon
              key={tag}
              tag={tag}
              onTrashIconClick={() => deleteTag(tag)}
            />
          ))
        : null}
      {/** FOR NOTES SEARCH: */}
      {!form && inputedTagValue ? (
        <TagButtonGeneratedByInput
          tag={inputedTagValue}
          link={
          "/search?name=" +
          (searchLinkFromFilterTags
              ? searchLinkFromFilterTags + "+" + inputedTagValue
              : inputedTagValue)
          }
          onClick={() => {
            const link = searchLinkFromFilterTags
                ? searchLinkFromFilterTags + "+" + inputedTagValue
                : inputedTagValue;
            setSearchLinkFromFilterTags(link);
            setInputedTagValue("");
          }}
        />
      ) : null}
      {!form && inputedTagValue && availableTags.length
        ? availableTags.map((tag, i) => (
          <TagButtonGeneratedByInput
            key={tag}
            tag={tag}
            link={
            "/search?name=" +
            (searchLinkFromFilterTags
                ? searchLinkFromFilterTags + "+" + tag
                : tag)
            }
            onClick={() => {
              const link = searchLinkFromFilterTags
                  ? searchLinkFromFilterTags + "+" + tag
                  : tag;
              setSearchLinkFromFilterTags(link);
              setInputedTagValue("");
            }}
          />
          ))
        : null}
      {/** FOR FORM SEARCH */}
      {form && inputedTagValue ? (
        <FormTagButton
          tag={inputedTagValue}
          onClick={() => {
            setChosenTags([...chosenTags, inputedTagValue]);
            setInputedTagValue("");
          }}
        />
      ) : null}
      {form && inputedTagValue && availableTags.length
        ? availableTags.map((tag, i) => (
            <FormTagButton
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
