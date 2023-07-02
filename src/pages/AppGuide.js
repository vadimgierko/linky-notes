import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MARKDOWN = `
# How to use *linky_notes* app efficiently

Although the *linky_notes* app has only a few simple functionalities,
it offers **endless possibilities** for organizing, searching and using your notes in the way,
which is impossible to many other note apps around.

Those functionalities are:
- adding one or more **tags** to each note,
- the ability to **filter** your notes *by* one or more *tags*,
- markdown editor, which enables **links** adding to your notes,
- each note has its own link (URL).

The way you can organize & filter your notes using those features is very **customizible**.
You can use my tips mentioned below or **create your own system**!

---

## Tags

Always **add at least one tag** to your note.
If you don't, you won't be able to find it without using ctrl-f command
or checking all the notes stored in your app.
You will not be able to group this note it with other notes.

Try to **add tags that not only define the content of a given note,
but also define the embedding of this content in a broader context**,
e.g. if your note is about creating a function in JavaScript (this is a programming language),
add tags: "function", "creating function", "javascript", "programming languages", "frontend", "learning" etc.

Try to add tags containing the description of the **type of note**,
e.g. "quote", "idea", "definition", "question" etc. This will group different types of your notes together, like all ideas or quotes.

Try to **add tags containing the description/ name of the project / area of ​interests** that this note refers to,
e.g. "learning programming", "productivity", "meeting with management", "note app project" etc.
This will group your notes by projects, interests or topics.

Although you may add the author & the source to each note as a reference,
it might be a good idea to **include a tag containing the first/ last name of the author** of the quote/ article you refer to
(it's better to add the author's name and surname as two separate tags)
and add a tag with the **name of the note source, e.g. book or article title** etc.

## Links

If the content of your note comes from the website, add a source's link to your note via source form or paste the URL straight to the note.

You can also **refer to other notes stored in your database using links**
(see [markdown guide](markdown-guide) how to do a link),
because **every note has it's own URL**.

You can organize/ group your notes this way by particular project or topic,
like **create notes containing lists of notes links**.
You may also add footnotes using [built-in markdown editor](markdown-guide)
& include references (as a link) to other notes stored in your app there.
The possibilities are endless.

## Markdown Syntax

**Use [built-in markdown editor](markdown-guide) to format your notes** & make them more readable (not only for links).

## Todo/ Check Lists

You may also create todo/check lists using [built-in markdown editor](markdown-guide).

## Edit & update

Remember, that you can always go back to any note & update it with the new tags or delete ones.
`;

export default function AppGuide() {
	return <ReactMarkdown children={MARKDOWN} remarkPlugins={[remarkGfm]} />;
}
