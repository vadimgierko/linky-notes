"use client";
import useTheme from "@/context/useTheme";
import { FormEvent } from "react";
import { Form, Button } from "react-bootstrap";

export type UserData = {
	email: string;
	password: string;
};

type AuthFormProps = {
	headerText: string;
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export default function AuthForm({ headerText, onSubmit }: AuthFormProps) {
	const { theme } = useTheme();

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
				onSubmit={(e) => onSubmit(e)}
			>
				<div className="d-grid my-2">
					<Button variant="primary" type="submit">
						{headerText}
					</Button>
				</div>
			</Form>
		</div>
	);
}
