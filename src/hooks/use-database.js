import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

import { createContext, useContext, useState, useEffect } from "react";
import { database, storage } from "../firebaseConfig";

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

  const [items, setItems] = useState(null);
  const [tags, setTags] = useState([]);
  const [sources, setSources] = useState(null);

  const addItem = (item) => {
    const newItem = {
      ...item,
    };

    const newItemKey = push(child(ref(database), "notes")).key;

    const updates = {};
    updates["notes/" + newItemKey] = newItem;

    return update(ref(database), updates);
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

  //========== SOURCES =============

  const addSource = (item) => {
    const newItem = {
      ...item,
    };

    const newItemKey = push(child(ref(database), "sources")).key;

    const updates = {};
    updates["sources/" + newItemKey] = newItem;

    return update(ref(database), updates);
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
    // fetch all items
    const itemsRef = ref(database, "notes/");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setItems(data);
        //console.log("items in database:", data);
      } else {
        console.log("there are no notes...");
      }
    });
    // fetch all tags
    const tagsRef = ref(database, "tags/tags");
    onValue(tagsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTags(data);
        console.log("tags in database:", data);
      } else {
        console.log("there are no tags...");
      }
    });
    // fetch all sources
    const sourcesRef = ref(database, "sources/");
    onValue(sourcesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSources(data);
        //console.log("sources in database:", data);
      } else {
        console.log("there are no sources...");
      }
    });
  }, []);

  return (
    <DatabaseContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        deleteItem,
        //updateUserData,
        //uploadProfileImage,
        //uploadItemImage,
        tags,
        addTags,
        sources,
        addSource
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}
