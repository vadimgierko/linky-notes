import { useTheme } from "../../hooks/use-theme";
import ItemCard from "../molecules/ItemCard";
import { useDatabase } from "../../hooks/use-database";

export default function ItemsList({ items }) {
  const { theme } = useTheme();
  const { deleteItem } = useDatabase();

  return (
    <div
      style={{
        background: theme.background,
        color: theme.color
      }}
    >
      <div>
        {items.slice().reverse().map((itemArray) => {
          const itemKey = itemArray[0];
          const item = itemArray[1];
          return (
            <ItemCard
              key={"item-" + itemKey}
              item={item}
              itemKey={itemKey}
              editLink={"/notes/update-note/" + itemKey}
              deleteFunction={() => deleteItem(itemKey)}
              deleteLink="/"
            />
          );
        })}
      </div>
    </div>
  );
}
