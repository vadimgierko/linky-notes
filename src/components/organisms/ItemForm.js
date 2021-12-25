import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/use-theme";
import { createDate } from "../../functions/functions";
import TagSearchForm from "./TagSearchForm";
import SourceForm from "./SourceForm";
import { useDatabase } from "../../hooks/use-database";

export default function ItemForm({
  tags,
  addTags,
  passedItem,
  onItemFormClick,
  link,
  buttonText,
  headerText,
  passedItemKey
}) {
  const { theme } = useTheme();
  const { sources, addSource } = useDatabase();

  const [sourcesList, setSourcesList] = useState([]);

  const [item, setItem] = useState(null);
  const [itemTags, setItemTags] = useState([]);

  const [isAddSourceFormNeeded, setIsAddSourceFormNeeded] = useState(false);

  useEffect(() => {
    if (sources) {
      setSourcesList([...Object.entries(sources)]);
    }
  }, [sources]);

  useEffect(() => {
    if (passedItem) {
      setItem({ ...passedItem });
      if (passedItem.tags.length) {
        setItemTags([...passedItem.tags]);
      }
    } else {
      setItem({
        content: "",
        tags: [],
        source: "",
        page: "",
        createdAt: null,
        updatedAt: null
      });
    }
  }, [passedItem]);

  useEffect(() => {
    if (item) {
      setItem({ ...item, tags: [...itemTags] });
    }
  }, [itemTags]);

  function addNewTagsToDatabase() {
    let newTags = [];
    for (let i = 0; i < item.tags.length; i++) {
      const newTag = item.tags[i];
      if (!tags.includes(newTag)) {
        newTags.push(newTag);
      }
    }
    if (newTags.length) {
      addTags(newTags);
      console.log("New tags:", newTags);
    } else {
      console.log("There are no new tags!");
    }
  }

  function fetchSourceObjectAndConvertIntoSourceRepresentation(sourceKey) {
    if (sources) {
      const sourceObject = sources[sourceKey];
      if (sourceObject) {
        return `${sourceObject.name} ${sourceObject.surname}, ${sourceObject.title}, ${sourceObject.city} ${sourceObject.year}`;
      } else {
        return "source was deleted probably...";
      }
    }
  }

  function onAddSourceFormSubmit(updatedItem) {
    addSource(updatedItem);
    setIsAddSourceFormNeeded(false);
  }

  useEffect(() => {
    if (item) {
      console.log("item:", item);
    }
  }, [item]);

  return (
    <div className={"card mb-2 shadow bg-" + theme.mode + (theme.mode === "dark" ? " border-secondary" : "")}>
      <div className="card-header fw-bold text-center">{headerText}</div>
      <div className="card-body">
        <form>
          <textarea
            className={
              "form-control mb-2 + bg-" +
              theme.mode +
              " text-" +
              (theme.mode === "dark" ? "light" : "dark")
            }
            placeholder="note content goes here"
            defaultValue={item ? item.content : ""}
            onChange={(e) => setItem({ ...item, content: e.target.value })}
          ></textarea>
          <TagSearchForm
            tags={tags}
            chosenTags={itemTags}
            setChosenTags={setItemTags}
            form={true}
          />
          <hr />
          <select
            className={
              "form-select mb-2 + bg-" +
              theme.mode +
              " text-" +
              (theme.mode === "dark" ? "light" : "dark")
            }
            value={item ? (item.source ? item.source : "") : ""}
            onChange={(e) => setItem({ ...item, source: e.target.value })}
          >
            <option>select source</option>
            {sourcesList && sourcesList.length
              ? sourcesList.map((sourceArray) => {
                  const sourceKey = sourceArray[0];
                  const sourceObject = sourceArray[1];
                  const sourceRepresentation = `${sourceObject.name} ${sourceObject.surname}, ${sourceObject.title}, ${sourceObject.city} ${sourceObject.year}`;
                  return (
                    <option
                      key={"source-option-" + sourceKey}
                      value={sourceKey}
                    >
                      {sourceRepresentation}
                    </option>
                  );
                })
              : null}
          </select>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => setIsAddSourceFormNeeded(true)}
          >
            ... or{" "}
            <span style={{ textDecoration: "underline" }}>
              add new source to database
            </span>
          </p>
          <input
            className={
              "form-control mb-2 + bg-" +
              theme.mode +
              " text-" +
              (theme.mode === "dark" ? "light" : "dark")
            }
            defaultValue={item ? item.page : ""}
            placeholder="page"
            onChange={(e) => setItem({ ...item, page: e.target.value })}
          />
          {item && item.source ? (
            <p>
              {fetchSourceObjectAndConvertIntoSourceRepresentation(item.source)}{" "}
              {item.page ? " [" + item.page + "]" : null}
            </p>
          ) : (
            <p>This note has no source...</p>
          )}
        </form>
        {isAddSourceFormNeeded ? (
          <div>
            <SourceForm
              handleSubmit={onAddSourceFormSubmit}
              handleCancel={() => setIsAddSourceFormNeeded(false)}
              headerText="Add new source to database!"
              buttonText="Add new source"
            />
          </div>
        ) : null}
      </div>
      <div className="card-footer">
        <Link
          to={link}
          type="button"
          className="btn btn-success mb-2 d-block text-white"
          onClick={() => {
            const date = createDate();
            let itemWithDate;
            if (passedItemKey) {
              itemWithDate = { ...item, updatedAt: date };
            } else {
              itemWithDate = { ...item, createdAt: date };
            }
            if (itemWithDate) {
              addNewTagsToDatabase();
              if (passedItemKey) {
                onItemFormClick(itemWithDate, passedItemKey);
              } else {
                onItemFormClick(itemWithDate);
              }
            } else {
              alert(
                "There is a problem with adding/ updating date to your note... Note is not created / updated"
              );
            }
            console.log(item);
          }}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
