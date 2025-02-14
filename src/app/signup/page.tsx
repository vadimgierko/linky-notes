import SignUpPageComponent from "./SignUpPageComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Linky Notes | Sign Up",
	robots: {
		index: false,
		googleBot: {
			index: false,
			follow: false,
		},
		follow: false,
	},
};

export default function SignUpPage() {
	return <SignUpPageComponent />;
}
