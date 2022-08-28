import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Section from "./Section";
// functions that add iconProps to icons & return lists with card data:
import generateTechnologies from "./generateTechnologies";
import generateFeatures from "./generateFeatures";
// react-bootstrap components:
import { Button } from "react-bootstrap";

const ABOUT_MARKDOWN = `
## Why use linky_notes?

- you can build your knowledge base by storing notes containing content from different sources (books, articles, blogs, podcasts, videos etc.) & your personal notes containing your own knowledge, ideas & reflections on any topic
- all of your notes are automatically organized (without any effort) in one place by tags you've added to them
- you can format your notes with built-in markdown editor easily & fast (you need only a few minutes to figure out markdown syntax basics (link to the guide is available in app's header)
- you can add sources to your notes & automatically build your source base
- your notes are easy to search & filter via tags search bar on the main page (you can also use ctrl-f search if you need)
- you don't need folders, categories or labels to organize your notes, so there is no structure or hierarchy to manage (and strugle) with
- you can add as many tags to your note/s, as you need (no limits)
- this app is not overloaded with crazy features & has simple user friendly interface
- no more overthinking about how to organize or find your notes
- you'll save a tone of time & mental resources you can use for creative activities, learning or developing projects

## What you can do with linky_notes?

- add, update & delete notes containing:
  - textual content,
  - links,
  - images (from the web),
  - ordered, unordered and nested lists and more
- see when the note was added & updated (the app does it automatically, so you don't have to worry about it)
- add, update & delete tag/s for/to each note,
- add, update & delete note's sources containing:
  - the title of the source
  - the source's author
  - link
  - page/s number/s
  - place of publishing
  - year of publishing
- filter notes by one or more tags you've added to your notes
- navigate beetween searching sessions
- check lists of all the
  - tags,
  - sources,
  - authors  
stored in the app ordered alphabetically, so you can be up to date with all topics you were interested and sources you've used
- BONUS: you can do all of things mentioned above using light or dark mode to make your work more comfortable

## How efficiently use linky_notes?

- always add at least one tag to your note (or you won't be able to find it without using ctrl-f or group it with other notes)
- try to add tags that not only define the content of a given note, but also define the embedding of this content in a broader context, e.g. if your note is about creating a function in JavaScript (this is a programming language), add tags: "function", "creating function", "javascript", "programming languages", "frontend", "learning" etc.
- try to add tags containing the description of the type of note, e.g. "quote", "idea", "definition", "question",
- try to add tags containing the description of the project / area of ​​interest that this note refers to, e.g. "learning programming", "productivity", "meeting with management", "note app project" etc.
- ~~in the tags you can also include the author of the note/ quote (it's better to add the author's name and surname as two separate tags) and add a tag with the name of the note source, e.g. book or article title etc.~~
- => you don't have to add tags with source's title, author's first and last name anymore (the crossed paragraph above), because you can add a source separately via source form or note form and I'm suggesting you to do that, because in the near future I'll add the possibility to filter notes by sources, authors & sources types.
- if the content of your note comes from the website, add a source's link to your note via source form
- use built-in markdown editor to format your notes & make them more readable
- remember, that you can always go back to any note & update it with the new tags or delete ones

## Motivation (problem I wanted to solve & solution)

I've made this app first of all for my own needs. I read a lot, create a lot (developing different knowledge-based projects) and... do a lot of notes:

- using different techniques, like: mindmapping, sketchnoting, Cornell Note Taking method
- noting on different materials, like: paper, books pages, phone, laptop
- storing notes... everywhere

So...

### Problem:

I couldn't manage & organize thousands of my paper & digital notes properly (I have developed my own system, but it's too far from what I need). So I've tried a few note apps, but none of them where satisfying - something always was missing.

### Solution:

I've understood, that I need to:

- have all notes (paper & digital) in one place
- organize them by tags, because my paper notes were in so many folders and places & also sometimes some notes were needed to be in a few project folders in the same time

So I've decided to build this note app & solved one of my biggest problems thanks to my own app. Now my notes will be tagged, organized & easy to find/ filter.

And when I've tested the app, I've decided to share it with the world to let everybody to build an easy to use, but effiecient knowledge/ notes base! Sign up & try here: https://vadimgierko.github.io/linky-notes/!

## Future of the app

- sources types (like: book, magazine, article, blog, web page, web platform, multimedia etc.)
- notes types (like: quotes, ideas, personal, definition, question etc.)
- filtering notes not only by tags, but also by sources, authors, sources and notes types
and much more!

## Technologies I've used in this project:

- React 17.0
- React Router 6.3
- React Redux 8.0
- Redux Toolkit 1.8
- Firebase 9.1
  - Authentication
  - Realtime Database
- React Bootstrap 2.4
- Bootstrap 5.1
- React Icons 4.4
- Bootstrap Icons 1.6
- React Markdown 8.0
- GitHub Pages 3.2
`;

export default function About() {
	const [windowSize, setWindowSize] = useState(window.innerWidth);
	const navigate = useNavigate();
	const [iconProps, setIconProps] = useState();
	const [sections, setSections] = useState([]);

	useEffect(() => {
		window.addEventListener("resize", () => {
			const size = window.innerWidth;
			setWindowSize(size);
		});
	}, []);

	useEffect(() => {
		// define icons props:
		const size = windowSize > 576 ? 80 : 50;
		const style = { margin: "0.5em" };
		const props = { style, size };
		setIconProps(props);
	}, [windowSize]);

	useEffect(() => {
		if (iconProps) {
			const TECHNOLOGIES = generateTechnologies(iconProps);
			const FEATURES = generateFeatures(iconProps);
			setSections([
				{
					header: "What you can do with linky_notes",
					cardsList: FEATURES,
					cardStyle: {
						padding: "0.5em",
						width: windowSize > 576 ? "33%" : "50%",
					},
				},
				{
					header: "Technologies used to build the app",
					cardsList: TECHNOLOGIES,
					cardStyle: {
						marginLeft: "1em",
						marginRight: "1em",
					},
				},
			]);
		}
	}, [iconProps]);

	return (
		<div className="text-center">
			<h1 className="mb-3" style={{ fontSize: windowSize > 576 ? 50 : 40 }}>
				Welcome to linky_notes!
			</h1>
			<p className="mb-3" style={{ fontSize: windowSize > 576 ? 20 : 16 }}>
				Build your easy to filter knowledge base & store, organize & filter your
				notes by tags!
			</p>
			<Button
				className="mb-3 me-3"
				variant="success"
				size={windowSize > 576 ? "lg" : "md"}
				onClick={() => navigate("/signin")}
			>
				Sign In
			</Button>
			<Button
				className="mb-3"
				variant="primary"
				size={windowSize > 576 ? "lg" : "md"}
				onClick={() => navigate("/signup")}
			>
				Sign Up
			</Button>
			{sections.length
				? sections.map((section, i) => (
						<Section
							key={"section-" + i}
							header={section.header}
							cardsList={section.cardsList}
							cardStyle={section.cardStyle}
						/>
				  ))
				: null}
			{/* <ReactMarkdown children={ABOUT_MARKDOWN} remarkPlugins={[remarkGfm]} /> */}
		</div>
	);
}