"use client";

import signInUpWithGoogle from "@/auth/signInUpWithGoogle";
import useUser from "@/context/useUser";
import { Button } from "react-bootstrap";

export default function SignInUpWithGoogleBtn() {
	const { user } = useUser();

	if (user) return null;

	return (
		<Button
			className="mb-5 me-3"
			variant="primary"
			onClick={signInUpWithGoogle}
		>
			Sign In/Up with Google
		</Button>
	);
}
