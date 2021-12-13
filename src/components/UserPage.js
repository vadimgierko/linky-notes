import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useTheme } from "../hooks/use-theme";
import { useDatabase } from "../hooks/use-database";
import { Link } from "react-router-dom";

export default function UserPage() {
  const { theme } = useTheme();
  const { users, items } = useDatabase();

  const { userId } = useParams();

  const [userData, setUserData] = useState(null);
  const [userItems, setUserItems] = useState(null);

  useEffect(() => {
    if (users && userId) {
      setUserData(users[userId]);
    }
  }, [users, userId, items]);

  useEffect(() => {
    if (userId && items) {
      setUserItems(items[userId]);
    }
  }, [users, userId, items]);

  return (
    <div
      style={{ background: theme.background, color: theme.color }}
    >
      {userId && userData ? (
        <div className="row">
            <div className="col-sm-4">
              <img src={userData.profileImageURL ? userData.profileImageURL : null} className="img-fluid" />
            </div>
            <div className="col-sm">
              <h5>{userData.firstName ? userData.firstName : null}</h5>
              <h5>{userData.lastName ? userData.lastName : null}</h5>
              <hr />
              <p>{userData.about ? userData.about : null}</p>
              <hr />
              <p>{userData.firstName}'s items:</p>
              <ul>
                {userItems ? (
                  Object.entries(userItems).map((userItem) => 
                    <li key={userItem[0]}>
                      <Link to={"/items/" + userId + "/" + userItem[0]}>
                        {userItem[1].title}
                      </Link>
                    </li>   
                  )
                ) : (
                  <div>
                    <h2>Downloading items...</h2>
                  </div>
                )}
              </ul>
            </div>
        </div>
      ) : (
        <div>
          <h2>Downloading data...</h2>
        </div>
      )}
    </div>
  );
}
