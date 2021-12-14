import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/use-theme";
import { useDatabase } from "../hooks/use-database";
import { createDate } from "../functions/functions";

export default function AddItemForm() {
  const { theme } = useTheme();

  const [item, setItem] = useState({
    content: "",
    //itemImageURL: null,
    tags: [],
    source: "",
    createdAt: null,
    updatedAt: null
  });
  
  const { addItem } = useDatabase();
  
  return (
    <div
      style={{ background: theme.background, color: theme.color }}
    >
      <h3>Create a new note!</h3>
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
      </form>
      <Link
        to="/items"
        type="button"
        className="btn btn-secondary mb-2"
        onClick={() => {
          const date = createDate();
          const itemWithDate = {...item, createdAt: date};
          if (itemWithDate) {
            addItem(itemWithDate);
          } else {
            alert("There is a problem with adding date to your note... Note is not created");
          }
          console.log(item);
        }}
      >
        Add a new note
      </Link>
    </div>
  );
}
