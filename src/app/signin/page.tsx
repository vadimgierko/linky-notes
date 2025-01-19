"use client";
import { FormEvent, useEffect } from "react";
import signIn from "@/auth/signin";
// react-bootstrap components:
import AuthForm from "@/components/AuthForm";
import { UserData } from "@/components/AuthForm";
import { useRouter } from "next/navigation";
import useUser from "@/context/useUser";

export default function SignIn() {
	const { user } = useUser();
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
			router.push("/");
		} else {
			alert(
				"You need to complete all input fields (not only white spaces...) to sign in!"
			);
		}
	}

	useEffect(() => {
		if (user) router.push("/");
	}, [router, user]);

	return <AuthForm headerText="Sign in" onSubmit={handleSubmit} />;
}
