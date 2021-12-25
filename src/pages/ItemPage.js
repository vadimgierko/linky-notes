import { useTheme } from "../hooks/use-theme";
import { useAuth } from "../hooks/use-auth";
import { useDatabase } from "../hooks/use-database";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemCard from "../components/molecules/ItemCard";

export default function ItemPage() {
  const { theme } = useTheme();
  const { items, deleteItem } = useDatabase();

  const { itemKey } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    if (items && itemKey) {
      setItem(items[itemKey]);
    }
  }, [items, itemKey]);

  return (
    <div
      style={{
        background: theme.background,
        color: theme.color
      }}
    >
      {item ? (
        <ItemCard
          key={"item-" + itemKey}
          item={item}
          itemKey={itemKey}
          editLink={"/notes/update-note/" + itemKey}
          deleteFunction={() => deleteItem(itemKey)}
          deleteLink="/"
        />
      ) : (
        <h1>Downloading data...</h1>
      )}
    </div>
  );
}
