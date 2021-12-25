import { useTheme } from "../hooks/use-theme";
import { useDatabase } from "../hooks/use-database";
import { useEffect, useState } from "react";
import TagSearchForm from "../components/organisms/TagSearchForm";
import ItemsList from "../components/organisms/ItemsList";
import { Link, useLocation } from "react-router-dom";
import { convertPolishSymbolsAndSpaces } from "../functions/functions";

export default function ItemsPage() {

  const { theme } = useTheme();

  const { search } = useLocation();

  const { items, tags } = useDatabase();

  const [filterTags, setFilterTags] = useState([]);
  const [searchLinkFromFilterTags, setSearchLinkFromFilterTags] = useState(
    null
  );

  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (search) {
      console.log("search:", search);
      const searchValue = search.slice(6);
      console.log("searchValue", searchValue)
      // when search value changes, set filter tags:
      setFilterTags(() => {
        const tags = searchValue.split("+");
        // decode tags from URL:
        let convertedTags = [];
        for (let n = 0; n < tags.length; n++) {
          convertedTags.push(decodeURI(tags[n]));
        }
        setSearchLinkFromFilterTags(() => {
          let link = "";
          for (let i = 0; i < convertedTags.length; i++) {
            if (i === 0) {
              link = convertedTags[i];
            } else {
              link = link + "+" + convertedTags[i];
            }
          }
          return link;
        });
        console.log("converted tags:", convertedTags)
        return [...convertedTags];
      });
    } else {
      console.log("There is no search value.");
    }
  }, [search]);

  function filterItems(filterTags) {
    if (items) {
      if (filterTags && filterTags.length) {
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
  }

  useEffect(() => {
    console.log("filterTags:", filterTags);
    filterItems(filterTags);
  }, [filterTags, items]);

  return (
    <div
      style={{
        background: theme.background,
        color: theme.color
      }}
    >
      <TagSearchForm
        tags={tags}
        chosenTags={filterTags}
        setChosenTags={setFilterTags}
        searchLinkFromFilterTags={searchLinkFromFilterTags}
        setSearchLinkFromFilterTags={setSearchLinkFromFilterTags}
      />
      {filterTags && filterTags.length ? (
        filteredItems && filteredItems.length ? (
          <ItemsList items={filteredItems} />
        ) : (
          <div>There are no notes including this tag/tags...</div>
        )
      ) : (
        <ItemsList items={items ? Object.entries(items) : []} />
      )}
    </div>
  );
}
