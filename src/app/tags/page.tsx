import PrivateRoute from "@/components/PrivateRoute";
import Tags from "./TagsPageComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Linky Notes | Tags",
	robots: {
		index: false,
		googleBot: {
			index: false,
			follow: false,
		},
		follow: false,
	},
};

export default function TagsPage() {
	return (
		<PrivateRoute>
			<Tags />
		</PrivateRoute>
	);
}
