import { useEffect, useState } from "react";
import { useTheme } from "../hooks/use-theme";
import { useAuth } from "../hooks/use-auth";
import { useDatabase } from "../hooks/use-database";

export default function Dashboard() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { userData, updateUserData, uploadProfileImage } = useDatabase();

  const [newUserData, setNewUserData] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (userData) {
      setNewUserData(userData)
    }
  }, [userData])

  return (
    <div
      style={{ background: theme.background, color: theme.color }}
    >
      {user ? (
        <div className="row">
          <div className="col-sm-4">
            {
              newUserData && newUserData.profileImageURL ?
              <img src={newUserData.profileImageURL} className="img-fluid" />
              :
              <div>No profile image yet...</div>
            }
            <p>Upload new profile image:</p>
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
                if (selectedFile) {
                  uploadProfileImage(selectedFile);
                }
              }}
            >
              Save new profile image
            </button>
          </div>
          <div className="col-sm" style={{borderLeft: `1px solid grey`}}>
            <p>Your email: {user.email}</p>
            <p>Your id: {user.uid}</p>
            <form>
              <p>Your first name:</p>
              <input
                className="form-control mb-2 d-inline"
                type="text"
                defaultValue={newUserData ? newUserData.firstName : ""}
                placeholder="your first name"
                onChange={(e) =>
                  setNewUserData({ ...newUserData, firstName: e.target.value })
                }
              />
              <p>Your last name:</p>
              <input
                className="form-control mb-2"
                type="text"
                defaultValue={newUserData ? newUserData.lastName : ""}
                placeholder="your last name"
                onChange={(e) =>
                  setNewUserData({ ...newUserData, lastName: e.target.value })
                }
              />
              <p>A few words about you:</p>
              <textarea
                className="form-control mb-2"
                placeholder="write a few words about you"
                defaultValue={newUserData ? newUserData.about : ""}
                onChange={(e) =>
                  setNewUserData({ ...newUserData, about: e.target.value })
                }
              ></textarea>
            </form>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => updateUserData(newUserData)}
            >
              Save your data
            </button>
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
