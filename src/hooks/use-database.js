import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

import { createContext, useContext, useState, useEffect } from "react";
import { firebaseAuth, database, storage } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import {
  ref,
  set,
  push,
  child,
  update,
  onValue,
  remove
} from "firebase/database";

const DatabaseContext = createContext();

export const useDatabase = () => useContext(DatabaseContext);

export function DatabaseProvider({ children }) {

  const [user, setUser] = useState(null);
  //const [userData, setUserData] = useState(null);
  //const [users, setUsers] = useState(null);
  const [items, setItems] = useState(null);
  const [tags, setTags] = useState([]);
  //const [userItems, setUserItems] = useState(null);

  const addItem = (item) => {
    if (user) {
      const newItem = {
        ...item,
        //userId: user.uid
      };

      const newItemKey = push(child(ref(database), "notes")).key;

      const updates = {};
      updates["notes/" + newItemKey] = newItem;

      return update(ref(database), updates);
    }
  };

  const updateItem = (updatedItem, itemKey) => {
    set(ref(database, "notes/" + itemKey), {
      ...updatedItem
    });
  };

  const deleteItem = (itemKey) => {
    remove(ref(database, "notes/" + itemKey));
  };

  //============ TAGS ================

  const addTags = (newTags) => {
    set(ref(database, "tags/"), {
      tags: [...tags, ...newTags]
    });
  };

  // const updateUserData = (userData) => {
  //   set(ref(database, "users/" + user.uid), {
  //     ...userData
  //   });
  // };

  // const getProfileImageURL = (profileImageRef) => {
  //   // get profile img url to users data:
  //   getDownloadURL(storageRef(storage, profileImageRef))
  //   .then((url) => {
  //     updateUserData({...userData, profileImageURL: url})
  //   })
  //   .catch((error) => {
  //     console.log(error.message);
  //   });
  // }

  // const uploadProfileImage = (image) => {
  //   // Create a reference to 'profileImage.jpg'
  //   const profileImageRef = storageRef(storage, `images/profileImages/${user.uid}/profileImg.png`);

  //   uploadBytes(profileImageRef, image).then((snapshot) => {
  //       if (snapshot) {
  //         getProfileImageURL(profileImageRef);
  //       } else {
  //         console.log("file is not uploaded yet...")
  //       }
  //   });
  // };

  // const getItemImageURL = (itemImageRef, itemKey, item) => {
  //   getDownloadURL(storageRef(storage, itemImageRef))
  //   .then((url) => {
  //     console.log("img url", url);
  //     const updatedItem = {
  //       ...item,
  //       itemImageURL: url
  //     }
  //     updateItem(updatedItem, itemKey);
  //   })
  //   .catch((error) => {
  //     console.log(error.message);
  //   });
  // }

  // const uploadItemImage = (image, itemKey, item) => {
  //   const itemImageRef = storageRef(storage, `images/itemsImages/${user.uid}/${itemKey}/itemImg.png`);

  //   uploadBytes(itemImageRef, image).then((snapshot) => {
  //       if (snapshot) {
  //         getItemImageURL(itemImageRef, itemKey, item);
  //       } else {
  //         console.log("file is not uploaded yet...")
  //       }
  //   });
  // }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);

        // const userDataRef = ref(database, `users/${user.uid}`);
        // onValue(userDataRef, (snapshot) => {
        //   const data = snapshot.val();
        //   if (data) {
        //     setUserData(data);
        //   } else {
        //     console.log("there are no user data...");
        //   }
        // });
        // //fetch users list
        // const usersRef = ref(database, `users/`);
        // onValue(usersRef, (snapshot) => {
        //   const data = snapshot.val();
        //   if (data) {
        //     setUsers(data);
        //   } else {
        //     console.log("there are no users...");
        //   }
        // });

        // fetch all items
        const itemsRef = ref(database, "notes/");
        onValue(itemsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setItems(data);
          } else {
            //console.log("there are no notes");
          }
        });
        // fetch all tags
        const tagsRef = ref(database, "tags/");
        onValue(tagsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setTags(data);
          } else {
            console.log("there are no tags");
          }
        });

        // fetch user items after log in
        // const userItemsRef = ref(database, "notes/" + user.uid);
        // onValue(userItemsRef, (snapshot) => {
        //   const data = snapshot.val();
        //   if (data) {
        //     setUserItems(data);
        //   } else {
        //     console.log("there are no user notes");
        //   }
        // });
      } else {
        setUser(null);
        //setUserData(null);
        //setUserItems(null);
        //fetch users list
        // const usersRef = ref(database, `users/`);
        // onValue(usersRef, (snapshot) => {
        //   const data = snapshot.val();
        //   if (data) {
        //     setUsers(data);
        //   } else {
        //     console.log("there are no users...");
        //   }
        // });
        // fetch all items
        const itemsRef = ref(database, "notes/");
        onValue(itemsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setItems(data);
          } else {
            //console.log("there are no notes");
          }
        });
        // fetch all tags
        const tagsRef = ref(database, "tags/");
        onValue(tagsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setTags(data);
          } else {
            console.log("there are no tags");
          }
        });
        console.log("user is logged out");
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <DatabaseContext.Provider
      value={{
        user,
        //userData,
        //users,
        items,
        //userItems,
        addItem,
        updateItem,
        deleteItem,
        //updateUserData,
        //uploadProfileImage,
        //uploadItemImage,
        tags,
        addTags
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}
