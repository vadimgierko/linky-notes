import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../hooks/use-theme";
import { useDatabase } from "../hooks/use-database";
import { useAuth } from "../hooks/use-auth";
import { createDate } from "../functions/functions";

export default function UpdateItemForm() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { items, updateItem } = useDatabase();
  //const { items, updateItem, uploadItemImage } = useDatabase();

  const { itemKey } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    if (items && itemKey) {
      setItem(items[itemKey]);
    }
  }, [items, itemKey]);

  //const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div
      style={{ background: theme.background, color: theme.color }}
    >
      {
        user && user.uid ?
        (
        item ?
        <>
          <h3>Update note!</h3>
          <hr />
          <div className="row">
            <div className="col">
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
                  const itemWithDate = {...item, updatedAt: date};
                  if (itemWithDate) {
                    updateItem(itemWithDate, itemKey);
                  } else {
                    alert("There is a problem with adding date to your note... Note is not created");
                  }
                  console.log(itemWithDate);
                }}
              >
                Update note
              </Link>
            </div>
          </div>          
        </>
        :
        <h3>Downloading data...</h3>
      )
      :
      <h3>You need to log in to update this item if it belongs to you...</h3>
      }
    </div>
  );
}
