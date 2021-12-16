import { useTheme } from "../hooks/use-theme";
import { useAuth } from "../hooks/use-auth";
import { useDatabase } from "../hooks/use-database";
import { useEffect, useState } from "react";
import ItemCard from "../components/molecules/ItemCard";
import TagSearchForm from "../components/molecules/TagSearchForm";

export default function ItemsList() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { items, deleteItem, tags } = useDatabase();
  
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
      <TagSearchForm tags={tags} filterTags={filterTags} setFilterTags={setFilterTags} />
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
