"use client";
import { FormEvent, useEffect } from "react";
import signIn from "@/auth/signin";
// react-bootstrap components:
import AuthForm from "@/components/AuthForm";
import { useRouter } from "next/navigation";
import useUser from "@/context/useUser";

export default function SignInPageComponent() {
	const { user } = useUser();
	const router = useRouter();

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (user) return;

		await signIn();
		router.push("/notes");
	}

	useEffect(() => {
		if (user) router.push("/notes");
	}, [router, user]);

	return <AuthForm headerText="Sign in with Google" onSubmit={handleSubmit} />;
}
