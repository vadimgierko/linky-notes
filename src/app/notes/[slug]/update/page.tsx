import { Metadata } from "next";
import UpdateNotePageComponent from "./UpdateNotePageComponent";

export const metadata: Metadata = {
	title: "Linky Notes | Update Note",
	robots: {
		index: false,
		googleBot: {
			index: false,
			follow: false,
		},
		follow: false,
	},
};

export default function UpdateNotePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	return (
		<UpdateNotePageComponent params={params} />
	);
}
