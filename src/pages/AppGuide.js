import MarkdownRenderer from "../components/MarkdownRenderer";

const CONTENT = `
<h1 align="center">How to use <em>linky_notes</em> app efficiently</h1>

---

Although the *linky_notes* app has only a few simple functionalities,
it offers **endless possibilities** for organizing, searching and using your notes in the way,
which is impossible to many other note apps around.

Those functionalities are:
- adding one or more **tags** to each note,
- the ability to **filter** your notes *by* one or more *tags*,
- the ability to **sort** your notes **by creation/ update date**,
- markdown editor, which enables **formatting your notes as web pages**
with additional possibility to use **HTML with inline styles**,
- each note has its own link (URL), so you can **link** your **notes internally**.

The way you can organize, filter & sort your notes using those features is very **customizible**.
You can use my tips mentioned below or **create your own system**!

---

## Tags

---

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

Try to **add tags containing the description/ name of the project / area of interests** that this note refers to,
e.g. "learning programming", "productivity", "meeting with management", "note app project" etc.
This will group your notes by projects, interests or topics.

If you want to add the author & the source to each note as a reference,
it might be a good idea to **include a tag containing the first/ last name of the author** of the quote/ article you refer to
(it's better to add the author's name and surname as two separate tags)
and add a tag with the **name of the note source, e.g. book or article title** etc.

---

## Links

---

If the content of your note comes from the website, add a source's link to your note or paste the URL.

You can also **refer to other notes stored in your database using links**
(see [markdown guide](/markdown-guide) how to do a link),
because **every note has it's own URL**.

You can organize/ group your notes this way by particular project or topic,
like **create notes containing lists of notes links**.
You may also add footnotes using [built-in markdown editor](/markdown-guide)
& include references (as a link) to other notes stored in your app there.
The possibilities are endless.

---

## Markdown & HTML with inline styles

---

**Use [built-in markdown editor](/markdown-guide) to format your notes** & make them more readable (not only for links).

In addition to [formatting your notes with Markdown syntax](/markdown-guide),
which gives a lot of possibilities, but is quite limited,
you can also use HTML with optional inline CSS styling!

Of course, that requires some basic knowledge of HTML & CSS, but if you are really motivated to
turn your note into complete web page full of colors, shapes, embed elements and any layout,
than you can learn it online for free pretty fast ([HTML Tutorial](https://www.w3schools.com/html/), [CSS Tutorial](https://www.w3schools.com/css/))

---

## Todo/ Check Lists

---

You may also create todo/check lists using [built-in markdown editor](/markdown-guide).

---

## Split & consolidate notes

---

- split bigger/growing notes into smaller one unit-notes & then
reuse/combine them into notes with internal links, table-of-content-like notes
- add more internal links to other notes; try to avoid orphans-notes with no links to other notes
- when note A describes smth and you use a term described in the note B,
make a link to the term instead of describing term B inside same note (if it's possible & has sense)
- if some tag has really a lot of notes linked & is a vast area, like *web development*, then create it's own note as a table-of-content-like note or index-note with links to other related tags-chapters or separate notes as you're trying to write an article or a chapter in the book to organize them

---

## Edit & update

---
Remember, that you can always go back to any note & update it with new tags or styles!
`;

export default function AppGuide() {
	return <MarkdownRenderer markdown={CONTENT} />;
}
