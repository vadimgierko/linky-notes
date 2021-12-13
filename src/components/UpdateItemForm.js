import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../hooks/use-theme";
import { useDatabase } from "../hooks/use-database";
import { useAuth } from "../hooks/use-auth";

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
            {/*<div className="col-4">
              {
                item.itemImageURL ?
                <img src={item.itemImageURL} className="img-fluid" />
                :
                <div>No item image yet...</div>
              }
              <p>Upload new item image:</p>
              <input
                className="form-control mb-2"
                type="file"
                onChange={(e) => {
                  setSelectedFile(e.target.files[0]);
                  console.log(e.target.files[0]);
                }}
              />
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  if (selectedFile && itemKey && item) {
                    uploadItemImage(selectedFile, itemKey, item);
                  }
                }}
              >
                Save new item image
              </button>
            </div>*/}
            <div className="col">
              <form>
                <input
                  className="form-control mb-2"
                  type="text"
                  defaultValue={item.title}
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
                  updateItem(item, itemKey);
                  console.log(item);
                }}
              >
                Update item data
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
