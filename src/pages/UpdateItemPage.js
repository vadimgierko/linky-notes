import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../hooks/use-theme";
import { useAuth } from "../hooks/use-auth";
import { useDatabase } from "../hooks/use-database";
import ItemForm from "../components/organisms/ItemForm";

export default function UpdateItemPage() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { items, updateItem, tags, addTags } = useDatabase();

  const { itemKey } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    if (items && itemKey) {
      setItem({...items[itemKey], tags: items[itemKey].tags && items[itemKey].tags.length ? items[itemKey].tags : []});
    }
  }, [items, itemKey]);

  return (
    <div
      style={{ background: theme.background, color: theme.color }}
    >
      {
        user && user.uid
          ? item
            ? <ItemForm
                tags={tags && tags.length ? tags : []}
                addTags={addTags}
                onItemFormClick={updateItem}
                link="/items"
                buttonText="Update note"
                headerText="Update note!"
                passedItem={item ? item : null}
                passedItemKey={itemKey ? itemKey : null}
              />
            : <h3>Downloading data...</h3>
          : <h3>You need to log in to update this item if it belongs to you...</h3>
      }
    </div>
  );
}
