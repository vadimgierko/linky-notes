import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../hooks/use-theme";
import { useDatabase } from "../hooks/use-database";
import { useAuth } from "../hooks/use-auth";
import { createDate } from "../functions/functions";

export default function UpdateItemForm() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { items, updateItem, tags, addTags } = useDatabase();

  const { itemKey } = useParams();

  const [inputedTagValue, setInputedTagValue] = useState("");
  const [availableTags, setAvailableTags] = useState(null);

  const [item, setItem] = useState(null);

  useEffect(() => {
    if (items && itemKey) {
      setItem({...items[itemKey], tags: items[itemKey].tags && items[itemKey].tags.length ? items[itemKey].tags : []});
    }
  }, [items, itemKey]);

  useEffect(() => {
    if (tags) {
      console.log("tags in database:", tags);
      console.log("useEffect in UpdateItemForm works...", )
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
    const updatedTags = item.tags.filter((item) => item !== tag);
    setItem({...item, tags: [...updatedTags]});
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

  function addNewTagsToDatabase() {
    let newTags = [...item.tags];
    for (let i = 0; i < newTags.length; i++) {
      for (let n = 0; n < tags.length; n++) {
        if (newTags[i] === tags[n]) {
          const deleteAt = i;
          newTags = [...newTags.slice(0, deleteAt), ...newTags.slice(deleteAt + 1)];
        }
      }
    }
    addTags(newTags);
  }

  useEffect(() => {
    console.log("inputedTagValue:", inputedTagValue);
    setAvailableTags(generateAvailableTags(inputedTagValue));
  }, [inputedTagValue]);

  return (
    <div
      style={{ background: theme.background, color: theme.color }}
    >
      {
        user && user.uid ?
        (
        item ?
        <div>
          <h3>Update note!</h3>
          <hr />
          <form>
            <textarea
              className="form-control mb-2"
              placeholder="note content goes here"
              defaultValue={item.content}
              onChange={(e) =>
                setItem({ ...item, content: e.target.value })
              }
            ></textarea>
            <input
              type="text"
              className="form-control mb-2"
              defaultValue={inputedTagValue}
              placeholder="type your tags here"
              onChange={(e) => setInputedTagValue(e.target.value)}
            />
          </form>
          {item.tags && item.tags.length
            ? item.tags.map((tag) => (
                <TagButton key={tag} tag={tag} deleteTag={deleteTag} />
              ))
            : (
              <div>
                <p>There are no note tags yet...</p>
                <hr />
              </div>
            )}
            {inputedTagValue ? (
            <div>
              <button
                className="btn btn-outline-secondary mb-2 me-2"
                style={{ cursor: "pointer", borderRadius: 20 }}
                onClick={() => {
                  setItem({...item, tags: [...item.tags, inputedTagValue]});
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
                      setItem({...item, tags: [...item.tags, tag]});
                      setInputedTagValue("");
                    }}
                  >
                    {tag}
                  </p>
                  <hr />
                </div>
              ))
            : null}
          <Link
            to="/items"
            type="button"
            className="btn btn-success mb-2 d-block text-white"
            onClick={() => {
              const date = createDate();
              const itemWithDate = {...item, updatedAt: date};
              if (itemWithDate) {
                addNewTagsToDatabase();
                updateItem(itemWithDate, itemKey);
              } else {
                alert("There is a problem with adding date to your note... Note is not created");
              }
              console.log(itemWithDate);
            }}
          >
            Update note
          </Link>                    
        </div>
        :
        <h3>Downloading data...</h3>
      )
      :
      <h3>You need to log in to update this item if it belongs to you...</h3>
      }
    </div>
  );
}
