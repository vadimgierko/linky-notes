"use client";
import { FormEvent, useEffect, useState } from "react";
import signIn from "@/auth/signin";
// react-bootstrap components:
import AuthForm from "@/components/AuthForm";
import { UserData } from "@/components/AuthForm";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";

export default function SignIn() {
	const [user, setUser] = useState<User | null>(null);
	const router = useRouter();

	function handleSubmit(e: FormEvent<HTMLFormElement>, userData: UserData) {
		e.preventDefault();

		if (user) return;
		if (
			userData.email.replace(/\s/g, "").length &&
			userData.password.replace(/\s/g, "").length
		) {
			// if (state && state.from) {
			// 	signIn(userData).then(() => navigate(state.from, { replace: true }));
			// } else {
			// 	signIn(userData).then(() => navigate("/", { replace: true }));
			// }
			signIn(userData);
		} else {
			alert(
				"You need to complete all input fields (not only white spaces...) to sign in!"
			);
		}
	}

	// check for logged user:
	useEffect(() => {
		if (auth.currentUser) {
			setUser(auth.currentUser);
			router.push("/");
		} else {
			setUser(null);
		}
	}, [router]);

	return <AuthForm headerText="Sign in" onSubmit={handleSubmit} />;
}
