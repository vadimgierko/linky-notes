"use client";
import { FormEvent, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { auth } from "@/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import useTheme from "@/context/useTheme";
import useUser from "@/context/useUser";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PasswordReset() {
	const { theme } = useTheme();
	const { user } = useUser();
	const [email, setEmail] = useState("");
	const router = useRouter();

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (email) {
			try {
				await sendPasswordResetEmail(auth, email);
				alert(
					"Password reset email was sent! Check your email and try to sign in again with reset password!"
				);
				router.push("/signin");
			} catch (error: unknown) {
				console.error(error);
			}
		} else {
			return console.error(
				"No email address was provided... Cannot send password reset email..."
			);
		}
	}

	useEffect(() => {
		if (user) router.push("/");
	}, [router, user]);

	return (
		<div
			style={{
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				color: theme === "light" ? "black" : "white",
				maxWidth: 360,
				margin: "auto",
			}}
		>
			<h1 className="text-center mb-3">Reset your password!</h1>

			<Form
				className="border border-secondary rounded p-3 shadow"
				onSubmit={handleSubmit}
			>
				<Form.Group className="mb-3">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter your email address"
						required
						onChange={(e) => setEmail(e.target.value)}
						style={{
							backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
							color: theme === "light" ? "black" : "white",
						}}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Text>
						Don&apos;t have an account? <Link href="/signup">Sign up!</Link>
					</Form.Text>
				</Form.Group>

				<div className="d-grid mb-2">
					<Button variant="success" type="submit">
						Send password reset email
					</Button>
				</div>
			</Form>
		</div>
	);
}
