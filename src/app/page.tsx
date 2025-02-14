import About from "./AboutPageComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
	// rest metadata is same as in layout.tsx...
	robots: {
		index: true,
		googleBot: {
			index: true,
			follow: true,
		},
		follow: true,
	},
};

export default function HomePage() {
	return <About />;
}
