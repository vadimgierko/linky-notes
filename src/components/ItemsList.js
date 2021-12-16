import { useTheme } from "../hooks/use-theme";
import { useAuth } from "../hooks/use-auth";
import { useDatabase } from "../hooks/use-database";
import { useEffect, useState } from "react";
import TagButtonWithTrashIcon from "../atoms/TagButtonWithTrashIcon";
import TagButton from "../atoms/TagButton";
import ItemCard from "../molecules/ItemCard";

export default function ItemsList() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { items, deleteItem, tags } = useDatabase();

  const [inputedTagValue, setInputedTagValue] = useState("");
  const [availableTags, setAvailableTags] = useState(null);
  const [filterTags, setFilterTags] = useState([]);

  const [filteredItems, setFilteredItems] = useState([]);

  function filterItems(filterTags) {
    if (items) {
      let filteredItemsArray = [];
      const itemsArray = Object.entries(items);
      for (let i = 0; i < itemsArray.length; i++) {
        const item = itemsArray[i][1];
        if (filterTags.length > 1) {
          let sameNum = 0;
          for (let n = 0; n < filterTags.length; n++) {
            for (let m = 0; m < item.tags.length; m++) {
              if (item.tags[m] === filterTags[n]) {
                sameNum++;
                if (sameNum === filterTags.length) {
                  filteredItemsArray.push([...itemsArray[i]]);
                }
              }
            }
          }
        } else {
          for (let m = 0; m < item.tags.length; m++) {
            const tag = item.tags[m];
            if (tag === filterTags[0]) {
              filteredItemsArray.push([...itemsArray[i]]);
            }
          }
        }
      }
      setFilteredItems([...filteredItemsArray]);
    }
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
    setAvailableTags(generateAvailableTags(inputedTagValue));
  }, [inputedTagValue]);

  useEffect(() => {
    filterItems(filterTags);
  }, [filterTags]);

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
                  setFilterTags([...filterTags, tag]);
                  setInputedTagValue("");
                }}
              />
            ))
          : null}
      </div>
      <div>
        {filteredItems && filteredItems.length
          ? filteredItems.map((itemArray) => {
              const itemKey = itemArray[0];
              const item = itemArray[1];
              return (
                <ItemCard
                  key={"item-" + itemKey}
                  item={item}
                  itemKey={itemKey}
                  editLink={"/items/update-item/" + itemKey}
                  deleteFunction={() => deleteItem(itemKey)}
                  deleteLink="/items"
                />
              );
            })
          : null}
      </div>
    </div>
  );
}
