import { useTheme } from "../hooks/use-theme";
import { useAuth } from "../hooks/use-auth";
import { useDatabase } from "../hooks/use-database";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ItemsList() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { items, deleteItem } = useDatabase();
  //const { items, users, deleteItem } = useDatabase();

  return (
    <div
      style={{
        background: theme.background,
        color: theme.color
      }}
    >
      <div>
        {items ? (
          Object.entries(items).map((itemObject) => {
            const itemKey = itemObject[0];
            const item = itemObject[1];
            return (
              <div className="row" key={itemKey}>
                {/*<div className="col-1">
                  <img src={item.itemImageURL} className="img-fluid" />
                </div>*/}
                <div className="col">
                  <div className="row">
                    <div className="col">
                      <h4>
                        <Link
                          to={"/items/" + itemKey}
                          style={{textDecoration: "none", color: theme.color}}
                        >
                          {item.title}
                        </Link>
                      </h4>
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
                    <div className="col-2 text-end">
                      {user && user.uid ? (
                        <>
                          <span>
                            <i
                              className="bi bi-trash text-danger me-2"
                              style={{ cursor: "pointer" }}
                              onClick={() => deleteItem(itemKey)}
                            ></i>
                          </span>
                          <Link to={"/items/update-item/" + itemKey}>
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
