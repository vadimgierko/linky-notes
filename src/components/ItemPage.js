import { useTheme } from "../hooks/use-theme";
import { useAuth } from "../hooks/use-auth";
import { useDatabase } from "../hooks/use-database";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ItemPage() {
  const { theme } = useTheme();
  const { items, deleteItem } = useDatabase();
  const { user } = useAuth();

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
        <>
          <div className="row">
            {/*<div className="col-4">
              {
                item.itemImageURL ?
                  <img src={item.itemImageURL} className="img-fluid" />
                :
                  <p>No item image yet...</p>
              }
            </div>*/}
            <div className="col">
              <h4>
                {item.title}
                {user && user.uid ? (
                  <>
                    <Link to="/items">
                      <i
                        className="bi bi-trash text-danger mx-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteItem(itemKey)}
                      ></i>
                    </Link>
                    <Link to={"/items/update-item/" + itemKey}>
                      <i
                        className="bi bi-pencil text-info"
                        style={{ cursor: "pointer" }}
                      ></i>
                    </Link>
                  </>
                ) : null}
              </h4>
              <p>{item.description}</p>
              {/*<p>
                by
                <Link to={"/users/" + userId} className="ms-2">
                  {users[userId].firstName + " " + users[userId].lastName}
                  <img
                    src={users[userId].profileImageURL}
                    height={20}
                    className="ms-2"
                  />
                </Link>
              </p>*/}
            </div>
          </div>
        </>
      ) : (
        <h1>Downloading data...</h1>
      )}
    </div>
  );
}
