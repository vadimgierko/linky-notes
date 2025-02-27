import generateTechnologies from "./generateTechnologies";
import generateFeatures from "./generateFeatures";
import Section from "./Section";
import { Metadata } from "next";
import SignInUpWithGoogleBtn from "@/components/SignInUpWithGoogleBtn";

export const metadata: Metadata = {
	title: "linky_notes | about",
	description:
		"linky_notes app allows you to create, organize & filter your notes by tags & create your own knowledge base",
	// authors: { name: "Vadim Gierko", url: "https://vadimgierko.com" },
	// keywords: ["linky notes", "notes app", "notetaking app", "tags", "tags", "knowledge base", "second brain"]
};

export default function About() {
	const iconProps = {
		style: { margin: "0.5em" },
		size: 50,
	};

	const TECHNOLOGIES = generateTechnologies(iconProps);
	const FEATURES = generateFeatures(iconProps);

	const SECTIONS = [
		{
			header: "What you can do with linky_notes",
			cardsList: FEATURES,
			isTech: false,
		},
		{
			header: "Technologies used to build the app",
			cardsList: TECHNOLOGIES,
			isTech: true,
		},
	];

	return (
		<div id="about-page" className="text-center">
			<header>
				<h1 className="my-3">Welcome to linky_notes!</h1>
				<p className="mb-5">
					Build your easy to filter knowledge base & store, organize & filter
					your notes by tags!
				</p>
				<SignInUpWithGoogleBtn />
			</header>
			{SECTIONS.length
				? SECTIONS.map((section, i) => (
						<Section
							key={"section-" + i}
							header={section.header}
							cardsList={section.cardsList}
							isTech={section.isTech}
						/>
				  ))
				: null}
		</div>
	);
}
