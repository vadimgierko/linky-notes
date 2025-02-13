"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";

const UserContext = createContext<{
	user: User | null;
}>({ user: null });

export default function useUser() {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error("useUser has to be used within <UserContext.Provider>");
	}

	return context;
}

interface UserProviderProps {
	children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (u) => {
			if (u) {
				setUser(u);
				// save user id to sessionStorage:
				sessionStorage.setItem("linky_notes_user_id", u.uid);
			} else {
				setUser(null);
				// ❗THIS IS NOT NEEDED❗
				// EVEN IF NEW USER LOGS IN,
				// TAGS WILL CHECK IF USER ID STORED IN SESSION STORAGE IS THE SAME AS LOGGED USER ID
				// remove user id from sessionStorage:
				// sessionStorage.removeItem("linky_notes_user_id");
			}
		});

		return unsubscribe;
	}, []);

	const value = {
		user,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
