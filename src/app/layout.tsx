import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Layout from "../components/Layout";
import { ThemeProvider } from "../context/useTheme";
import { UserProvider } from "@/context/useUser";
import { NotesProvider } from "@/context/useNotes";

/**
 * This below is added automatically:
 * `<meta charset="utf-8" />`
 * `<meta name="viewport" content="width=device-width, initial-scale=1" />`
 */
export const metadata: Metadata = {
	title: "linky_notes | organize & filter your notes by tags",
	description:
		"linky_notes app allows you to create, organize & filter your notes by tags & create your own knowledge base",
	authors: { name: "Vadim Gierko", url: "https://vadimgierko.com" },
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
						<NotesProvider>
							<Layout>{children}</Layout>
						</NotesProvider>
					</UserProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
