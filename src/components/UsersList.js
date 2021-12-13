import { useTheme } from "../hooks/use-theme";
import { useDatabase } from "../hooks/use-database";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UsersList() {
  const { theme } = useTheme();
  const { users } = useDatabase();

  return (
    <div
      style={{
        background: theme.background,
        color: theme.color
      }}
    >
      <h1>Users in database</h1>
      <hr />
      <div>
        {users ? (
          Object.entries(users).map((user) => {
            const userId = user[0];
            const userData = user[1];
            return (
              <div
                key={userId}
                className="border mb-3 p-2"
              >
                <img
                  src={userData.profileImageURL}
                  style={{width: 50}}
                  
                />
                <Link
                  to={"/users/" + userId}
                  key={userId}
                  style={{textDecoration: "none", color: theme.color}}
                >
                  <h5 className="ms-2 d-inline">{userData.firstName + " " + userData.lastName}</h5>
                </Link>
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
