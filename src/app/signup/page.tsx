"use client";

import signUp from "@/auth/signUp";
import AuthForm, { UserData } from "@/components/AuthForm";
import useUser from "@/context/useUser";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect } from "react";

export default function SignUp() {
	const { user } = useUser();
	const router = useRouter();

	async function handleSubmit(
		e: FormEvent<HTMLFormElement>,
		userData: UserData
	) {
		e.preventDefault();

		if (
			userData.email.replace(/\s/g, "").length &&
			userData.password.replace(/\s/g, "").length
		) {
			// if (state && state.from) {
			// 	signUp(userData).then(() => navigate(state.from, { replace: true }));
			// } else {
			// 	signUp(userData).then(() => navigate("/", { replace: true }));
			// }
			await signUp(userData);
			router.push("/notes");
		} else {
			alert(
				"You need to complete all input fields (not only white spaces...) to create an account!"
			);
		}
	}

	useEffect(() => {
		if (user) router.push("/notes");
	}, [router, user]);

	return <AuthForm headerText="Sign up" onSubmit={handleSubmit} />;
}
