import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Layout from "../components/Layout";
import { ThemeProvider } from "../context/useTheme";
import { UserProvider } from "@/context/useUser";
import { TagsProvider } from "@/context/useTags";
import { NotesProvider } from "@/context/useNotes";

/**
 * This below is added automatically:
 * `<meta charset="utf-8" />`
 * `<meta name="viewport" content="width=device-width, initial-scale=1" />`
 *
 * ❗❗❗ metadata cannot be exported from client components with "use client"❗❗❗
 */
export const metadata: Metadata = {
	metadataBase: new URL("https://linkynotes.com"),
	title: "Linky Notes | About",
	description:
		"Linky Notes App allows you to create, organize & filter your notes by tags & create your own knowledge base",
	authors: { name: "Vadim Gierko", url: "https://vadimgierko.com" },
	keywords: [
		"linky notes",
		"notes app",
		"notetaking app",
		"tags",
		"tags",
		"knowledge base",
		"second brain",
	],
	alternates: {
		canonical: "/",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-bs-theme="dark">
			<body>
				<ThemeProvider>
					<UserProvider>
						<TagsProvider>
							<NotesProvider>
								<Layout>{children}</Layout>
							</NotesProvider>
						</TagsProvider>
					</UserProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
