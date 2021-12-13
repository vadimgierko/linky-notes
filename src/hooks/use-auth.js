import { createContext, useContext, useState, useEffect } from "react";
import { firebaseAuth } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        console.log("user is signed in");
        return userCredential.user;
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const logOut = () => {
    return signOut(firebaseAuth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
        console.log("user is logged");
      } else {
        setUser(null);
        console.log("user is logged out");
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        logOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
