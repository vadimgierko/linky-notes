import { useTheme } from "../hooks/use-theme";
import { useAuth } from "../hooks/use-auth";
import { useDatabase } from "../hooks/use-database";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ItemsList() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { items, users, deleteItem } = useDatabase();

  return (
    <div
      style={{
        background: theme.background,
        color: theme.color
      }}
    >
      <h1>Items stored in database</h1>
      <hr />
      <div>
        {items ? (
          Object.entries(items).map((userItems) => {
            const userId = userItems[0];
            const userItemsObject = userItems[1];
            return Object.entries(userItemsObject).map((itemObject) => {
              const itemKey = itemObject[0];
              const item = itemObject[1];
              return (
                <div className="row" key={itemKey}>
                  <div className="col-1">
                    <img src={item.itemImageURL} className="img-fluid" />
                  </div>
                  <div className="col" style={{borderLeft: "1px solid grey"}}>
                    <div className="row">
                      <div className="col">
                        <h4>
                          <Link
                            to={"/items/" + userId + "/" + itemKey}
                            style={{textDecoration: "none", color: theme.color}}
                          >
                            {item.title}
                          </Link>
                        </h4>
                        <p>
                          by
                          <Link to={"/users/" + userId} className="ms-2">
                            {users[userId].firstName + " " + users[userId].lastName}
                            <img
                              src={users[userId].profileImageURL}
                              height={20}
                              className="ms-2"
                            />
                          </Link>
                        </p>
                      </div>
                      <div className="col-2 text-end">
                        {user && userId === user.uid ? (
                          <>
                            <span>
                              <i
                                className="bi bi-trash text-danger me-2"
                                style={{ cursor: "pointer" }}
                                onClick={() => deleteItem(itemKey)}
                              ></i>
                            </span>
                            <Link to={"/items/update-item/" + userId + "/" + itemKey}>
                              <i
                                className="bi bi-pencil text-info me-2"
                                style={{ cursor: "pointer" }}
                              ></i>
                            </Link>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            });
          })
        ) : (
          <div>
            <h2>Downloading data...</h2>
          </div>
        )}
      </div>
    </div>
  );
}
