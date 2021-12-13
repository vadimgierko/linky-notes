import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage, ref } from "firebase/storage";

// Add your Firebase credentials
const firebaseConfig = {
  apiKey: "AIzaSyAPWGXObZYjKpf-y_PGP6I5lScPczF6Ll8",
  authDomain: "useauth-test-app.firebaseapp.com",
  databaseURL: "https://useauth-test-app-default-rtdb.firebaseio.com",
  projectId: "useauth-test-app",
  storageBucket: "useauth-test-app.appspot.com",
  messagingSenderId: "318231281835",
  appId: "1:318231281835:web:e85c7c4fe3d9c9ba36f7ee"
};
// Initialize Firebase
let app;
try {
  app = getApp();
} catch (e) {
  app = initializeApp(firebaseConfig);
}

export const firebaseAuth = getAuth(app);
export const database = getDatabase(app);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(app);
