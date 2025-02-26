import { Metadata } from "next";
import AddNotePageComponent from "./AddNotePageComponent";

export const metadata: Metadata = {
	title: "Linky Notes | Add Note",
	robots: {
		index: false,
		googleBot: {
			index: false,
			follow: false,
		},
		follow: false,
	},
};

export default function AddNotePage() {
	return <AddNotePageComponent />
}