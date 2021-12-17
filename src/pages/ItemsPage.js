import { useTheme } from "../hooks/use-theme";
import { useDatabase } from "../hooks/use-database";
import { useEffect, useState } from "react";
import TagSearchForm from "../components/molecules/TagSearchForm";
import ItemsList from "../components/organisms/ItemsList";

export default function ItemsPage() {
  const { theme } = useTheme();
  const { items, tags } = useDatabase();

  const [filterTags, setFilterTags] = useState([]);

  const [filteredItems, setFilteredItems] = useState([]);

  function filterItems(filterTags) {
    if (items) {
      let filteredItemsArray = [];
      const itemsArray = Object.entries(items);
      for (let i = 0; i < itemsArray.length; i++) {
        const item = itemsArray[i][1];
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
      }
      setFilteredItems([...filteredItemsArray]);
    }
  }

  useEffect(() => {
    filterItems(filterTags);
  }, [filterTags]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <div
      style={{
        background: theme.background,
        color: theme.color
      }}
    >
      <TagSearchForm
        tags={tags}
        filterTags={filterTags}
        setFilterTags={setFilterTags}
      />
      {filteredItems && filteredItems.length
        ? <ItemsList items={filteredItems} />
        : <ItemsList items={items ? Object.entries(items) : []} />}
    </div>
  );
}
