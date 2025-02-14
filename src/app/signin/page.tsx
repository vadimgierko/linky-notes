import SignInPageComponent from "./SignInPageCompronent";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Linky Notes | Sign In",
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
	return <SignInPageComponent />;
}
