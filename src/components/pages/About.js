import { useTheme } from "../../hooks/use-theme";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ABOUT_MARKDOWN = `
# CREATE, ORGANIZE & FILTER your NOTES BY TAGS

This app allows you to create notes and add tags to them.

Thanks to that:
- your notes are linked with each other by keywords (tags)
- they are grouped by tags
- the note can have a few tags, so it would be in a few keywords groups
- you don't need to put notes in folders or do any index or table of content
- that is easy to find the particular note by choosing keywords they consist in search field
- you are saving a tone of time to organize & efficiently use them

## Motivation

I've made this app first of all for myself. I read a lot, create a lot and... do a lot notes. I couldn't manage hunderds of my notes, so I've decided to build this app. And I'm very proud, that finally, after one year of learning web development, I've solved one of my biggest problems thanks to my own app. Now my notes will be tagged, organized & easy to filter.

## What you can do with the app at the moment

- sign in/up & log out
- **add, update & delete notes** when logged
- add & delete **tags** to/from the notes or leave it without tags
- ~~add & delete **source** for my notes or leave it without the source~~ (comming soon - after massive rebuild from scratch, I need some time to rebuild & add the feature once again)
- **search/ filter notes by tag/ tags**
- searching mechanism generates link for each searching session, so:
  - you can navigate beetween searching sessions
- switch dark/ light mode

## Technologies I've used in this project:
- React 17
- React Router 5.2
- React Context & useContext
- Firebase 9.1 (authentication, realtime database, storage)
- Bootstrap 5.1
- React Markdown 8.0

## UPDATE NOTE

From 23.02 to 07.03 I adapted this app to a new architecture, data layer management pattern & security rules taken from my template starter app. Now you can **sign up, add, edit & delete notes, add & delete tags to them & filter notes by tags**. I rebuild the app basically from scratch, and **now it's available for everyone** and not only for my personal use, like it was before.

From 11.03 I started working on rewriting add source/references features from scratch (I had this functionality before, but it was...) So, You can add your notes at the moment, but without a reference. When I add "add/edit source" feature, you can just update your notes.

While I was thinking about how to adapt this new rebuilt feature, I've understood, that I need to have **more of reusable & customizable components**, so all my work on addSource features became a playing background & test enviroment for new ideas. That's why it's so log, but... I make progress & **simplified, split & refactored a lot of other components**, so when the feature will be ready, I **plan to apply these reusable & customizable components to all app**, what means that I would **rebuild the app again**... and I did it partially already ;-)

But don't worry, these under-the-hood changes will not impact on your experience of using this app!
`;

export default function About() {
	const { theme } = useTheme();

	return (
		<div style={{ background: theme.background, color: theme.color }}>
			<ReactMarkdown children={ABOUT_MARKDOWN} remarkPlugins={[remarkGfm]} />
		</div>
	);
}
