import { useTheme } from "../hooks/use-theme";
import { useAuth } from "../hooks/use-auth";
import { useDatabase } from "../hooks/use-database";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { createShortContentAfterTitle, createShorterTitle } from "../functions/functions";

export default function ItemsList() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { items, deleteItem, tags } = useDatabase();

  const [inputedTagValue, setInputedTagValue] = useState("");
  const [availableTags, setAvailableTags] = useState(null);
  const [filterTags, setFilterTags] = useState([]);

  useEffect(() => {
    if (tags) {
      console.log("tags in database:", tags);
    } else {
      console.log("There are no tags in database...");
    }
  }, [tags]);
  
  function TagButton({ tag, deleteTag }) {
    return (
      <button type="button" className="btn btn-secondary mb-2 me-2" style={{ borderRadius: 20 }}>
        {tag}{" "}
        <i
          className="bi bi-trash text-white m-2"
          style={{
            backgroundColor: "red",
            cursor: "pointer"
          }}
          onClick={() => deleteTag(tag)}
        ></i>
      </button>
    );
  }

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
    console.log("inputedTagValue:", inputedTagValue);
    setAvailableTags(generateAvailableTags(inputedTagValue));
  }, [inputedTagValue]);

  return (
    <div
      style={{
        background: theme.background,
        color: theme.color
      }}
    >
      <div>
        <input
          type="text"
          className="form-control mb-2"
          defaultValue={inputedTagValue}
          placeholder="type some tag to search for notes"
          onChange={(e) => setInputedTagValue(e.target.value)}
        />
        {filterTags && filterTags.length
          ? filterTags.map((tag) => (
              <TagButton key={tag} tag={tag} deleteTag={deleteTag} />
            ))
          : (
            <div>
              <p>There are no filter tags yet...</p>
              <hr />
            </div>
          )
        }
      {inputedTagValue ? (
        <div>
          <button
            className="btn btn-outline-secondary mb-2 me-2"
            style={{ cursor: "pointer", borderRadius: 20 }}
            onClick={() => {
              setFilterTags([...filterTags, inputedTagValue]);
              setInputedTagValue("");
            }}
          >
            {inputedTagValue}
          </button>
          <hr />
        </div>
      ) : null}
      {inputedTagValue && availableTags.length
        ? availableTags.map((tag, i) => (
            <div key={tag + i}>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setFilterTags([...filterTags, tag]);
                  setInputedTagValue("");
                }}
              >
                {tag}
              </p>
              <hr />
            </div>
          ))
        : null}
        <hr />
      </div>
      <div>
        {items ? (
          Object.entries(items).map((itemObject) => {
            const itemKey = itemObject[0];
            const item = itemObject[1];
            return (
              <div className="row" key={itemKey}>
                <div className="row">
                  <div className="col">
                    <h4>
                      <Link
                        to={"/items/" + itemKey}
                        style={{textDecoration: "none", color: theme.color}}
                      >
                        {
                          createShorterTitle(item.content)
                        }
                      </Link>
                    </h4>
                    <p>{createShortContentAfterTitle(item.content)}</p>
                    <div>{item.tags && item.tags.length
                      ? item.tags.map((tag) => (
                        <button
                          key={"tag-button-for-" + tag}
                          className="btn btn-outline-secondary mb-2 me-2"
                          style={{ borderRadius: 20 }}
                        >
                          {tag}
                        </button>
                        ))
                      : (null)}
                    </div>
                    <p>{item.createdAt} {item.updatedAt ? " -> " + item.updatedAt : null}</p>
                  </div>
                  <div className="col-2 text-end">
                    {user && user.uid ? (
                      <>
                        <span>
                          <i
                            className="bi bi-trash text-danger me-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => deleteItem(itemKey)}
                          ></i>
                        </span>
                        <Link to={"/items/update-item/" + itemKey}>
                          <i
                            className="bi bi-pencil text-info me-2"
                            style={{ cursor: "pointer" }}
                          ></i>
                        </Link>
                      </>
                    ) : null}
                  </div>
                </div>
                <hr />
              </div>
            );
          })
        ) : (
          <div>
            <h2>Downloading data...</h2>
          </div>
        )}
      </div>
    </div>
  );
}
