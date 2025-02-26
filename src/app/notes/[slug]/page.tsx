import { Metadata } from "next";
import NotePageComponent from "./NotePageComponent";

export const metadata: Metadata = {
	title: "Linky Notes | Note",
	robots: {
		index: false,
		googleBot: {
			index: false,
			follow: false,
		},
		follow: false,
	},
};

export default function NotePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	return (
		<NotePageComponent params={params} />
	);
}
