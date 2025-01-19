"use client";
import useTheme from "@/context/useTheme";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Form, Button } from "react-bootstrap";

export type UserData = {
	email: string;
	password: string;
};

type AuthFormProps = {
	headerText: string;
	onSubmit: (e: FormEvent<HTMLFormElement>, userData: UserData) => void;
};

export default function AuthForm({ headerText, onSubmit }: AuthFormProps) {
	const { theme } = useTheme();

	const [userData, setUserData] = useState<UserData>({
		email: "",
		password: "",
	});

	return (
		<div
			style={{
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				color: theme === "light" ? "black" : "white",
				maxWidth: 360,
				margin: "auto",
			}}
		>
			<h1 className="text-center mb-3">{headerText}</h1>
			<Form
				className="border border-secondary rounded p-3 shadow"
				onSubmit={(e) => onSubmit(e, userData)}
			>
				<Form.Group className="mb-3">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter your email address"
						onChange={(e) =>
							setUserData({
								...userData,
								email: e.target.value,
							})
						}
						style={{
							backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
							color: theme === "light" ? "black" : "white",
						}}
					/>
					{headerText === "Sign up" && (
						<Form.Text className="text-muted">
							We&apos;ll never share your email with anyone else.
						</Form.Text>
					)}
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter your password"
						onChange={(e) =>
							setUserData({
								...userData,
								password: e.target.value,
							})
						}
						style={{
							backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
							color: theme === "light" ? "black" : "white",
						}}
					/>
					<br />
					{headerText === "Sign in" ? (
						<>
							<Form.Text>
								Don&apos;t have an account?{" "}
								<Link
									href="/signup"
									// state={{ from: state && state.from ? state.from : "/" }}
									replace
								>
									Sign up!
								</Link>
							</Form.Text>

							<Form.Group className="mb-3">
								<Form.Text>
									Forgot password?{" "}
									<Link href="/password-reset">
										Send a password reset email!
									</Link>
								</Form.Text>
							</Form.Group>
						</>
					) : (
						<Form.Text>
							Already have an account?{" "}
							<Link
								href="/signin"
								// state={{ from: state && state.from ? state.from : "/" }}
								replace
							>
								Sign in!
							</Link>
						</Form.Text>
					)}
				</Form.Group>

				<div className="d-grid my-2">
					<Button variant="success" type="submit">
						{headerText}
					</Button>
				</div>
			</Form>
		</div>
	);
}
