import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/use-theme";
import { useDatabase } from "../hooks/use-database";

export default function AddItemForm() {
  const { theme } = useTheme();

  const [item, setItem] = useState({
    title: "",
    description: "",
    itemImageURL: null
  });
  
  const { addItem } = useDatabase();
  
  return (
    <div
      style={{ background: theme.background, color: theme.color }}
    >
      <h3>Create a new item!</h3>
      <hr />
      <form>
        <input
          className="form-control mb-2"
          type="text"
          placeholder="title"
          onChange={(e) =>
            setItem({ ...item, title: e.target.value })
          }
        />
        <textarea
          className="form-control mb-2"
          placeholder="item description goes here"
          defaultValue={item.description}
          onChange={(e) =>
            setItem({ ...item, description: e.target.value })
          }
        ></textarea>
      </form>
      <Link
        to="/items"
        type="button"
        className="btn btn-secondary mb-2"
        onClick={() => {
          addItem(item);
          console.log(item);
        }}
      >
        Add a new item
      </Link>
    </div>
  );
}
