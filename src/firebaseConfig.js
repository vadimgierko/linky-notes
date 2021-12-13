import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Add your Firebase credentials
const firebaseConfig = {
  apiKey: "AIzaSyBO2_8QOJb3muKvNWqxDfCzViDwNURiUJc",
  authDomain: "linky-notes-47eef.firebaseapp.com",
  databaseURL: "https://linky-notes-47eef-default-rtdb.firebaseio.com",
  projectId: "linky-notes-47eef",
  storageBucket: "linky-notes-47eef.appspot.com",
  messagingSenderId: "1067601111242",
  appId: "1:1067601111242:web:75f3f608656fe612ef6c33"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
export const database = getDatabase(app);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(app);
