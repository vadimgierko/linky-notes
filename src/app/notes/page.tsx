import { Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { Metadata } from "next";
import NotesPageComponent from "./NotesPageComponent";

export const metadata: Metadata = {
	title: "Linky Notes | Notes",
	robots: {
		index: false,
		googleBot: {
			index: false,
			follow: false,
		},
		follow: false,
	},
};

export default function NotesPageWrappedInSuspense() {
	return (
		<Suspense
			fallback={
				<h1 className="text-center">
					Your Notes Are Pending...{" "}
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</h1>
			}
		>
			<NotesPageComponent />
		</Suspense>
	);
}
