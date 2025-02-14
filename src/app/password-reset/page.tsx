import { Metadata } from "next";
import PasswordResetPageComponent from "./PasswordResetPageComponent";

export const metadata: Metadata = {
	title: "Linky Notes | Reset Password",
	robots: {
		index: false,
		googleBot: {
			index: false,
			follow: false,
		},
		follow: false,
	},
};

export default function SignInPage() {
	return <PasswordResetPageComponent />;
}
