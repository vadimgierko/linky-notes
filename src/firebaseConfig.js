import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// import { getFirestore } from "firebase/firestore";

// Add your Firebase credentials
const firebaseConfig = {
	apiKey: "AIzaSyBO2_8QOJb3muKvNWqxDfCzViDwNURiUJc",
	authDomain: "linky-notes-47eef.firebaseapp.com",
	databaseURL: "https://linky-notes-47eef-default-rtdb.firebaseio.com",
	projectId: "linky-notes-47eef",
	storageBucket: "linky-notes-47eef.appspot.com",
	messagingSenderId: "1067601111242",
	appId: "1:1067601111242:web:75f3f608656fe612ef6c33",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firebase Realtime Database and get a reference to the service:
export const database = getDatabase(app);
// TODO: export const rtdb = getDatabase(app);

// TODO: replace rtdb with firestore, so init firestore:
// Initialize Cloud Firestore and get a reference to the service:
//export const firestore = getFirestore(app);
