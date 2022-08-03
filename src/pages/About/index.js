import { useTheme } from "../../contexts/useTheme";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ABOUT_MARKDOWN = `
# Create, organize & filter your notes by tags!

**Sign up & try** the app **for free** here: https://vadimgierko.github.io/linky-notes/

## Why use linky_notes?

This app is not overloaded with crazy features or UI & has only necessary functionality:

- add, update & delete text note/s,
- add, update & delete tag/s for your note/s,
- filter notes by tag/s.

Thanks to these features:

- you don't need to think how to organize your notes
- you don't need to put notes into the folders or do any index or table of content
- you don't need to organize notes by categories (often limited in other apps)
- you just put all your notes into the app without overthinking (just be sure to add some tags to your note!)
- your notes will be linked with each other & grouped by tags/ keywords
- the note can have unlimited number of tags, so it would be in a few tags/ keywords groups
- that is easy to find the particular note by choosing keywords they consist in search field
- you are saving a tone of time & mental resources, because you don't need to organize your notes (and reorganize them in the future) & you can find/ filter them quickly by tags attached

## Motivation

I've made this app first of all for myself. I read a lot, create a lot and... do a lot of notes. I couldn't manage hunderds of my notes, tried a few note apps, but none of them where satisfying. So I've decided to build this app & solved one of my biggest problems thanks to my own app. Now my notes will be tagged, organized & easy to find/ filter.

## What you can do with the app at the moment

- create free user account, sign in & log out
- **add, update & delete notes** when you're logged
- **add & delete tags** to/ from the notes or leave it without tags
- in previous version you could add the source to the note, but the mechanism wasn't perfect & was deleted, so for now I suggest you to add the author's name as a tag and do the same with the source's title (I'll figure out the best way of adding source later...)
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

## Note for users

The app can be changed/ refactored at any moment, there will be a database migration soon, so you can fully use this app & trust it only when this info will disapear. But if you're a programmer, you can clone this project, create a new Firebase project for your copy, change Firebase SDK in firebaseConfig.js file & use it without any worries about future changes of the app. But... at the moment I'm migrating from Context API state management to Redux, so the GitHub Pages version of this app currently doesn't reflect constantly changing repo. To clone this project, wait until this message disapear.
`;

export default function About() {
	const { theme } = useTheme();

	return (
		<div
			style={{
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				color: theme === "light" ? "black" : "white",
			}}
		>
			<ReactMarkdown children={ABOUT_MARKDOWN} remarkPlugins={[remarkGfm]} />
		</div>
	);
}
