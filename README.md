<header align="center">
  <h1>Welcome to linky_notes!</h1>

  <p>
    Build your own easy-to-filter and internally linked notes system!
    <br />
    Store, organize & filter your notes by tags & style/format them using Markdown & HTML with inline CSS styles.
    <br />
    <strong>
      <a href="https://linkynotes.com">Visit the app & see more. It's free!</a>
    </strong>
  </p>
</header>

---

## Notes 📝

You can **create, update & delete notes**. Every note has its own **id and URL based on the id**, so that means that every note is basically the **standalone web page**.

Notes are created & updated with auto timestamps.

## Tags 🔑

To be able to add/ update note, you need to add **at least 1 tag** to it. There are **no limits** to how many tags you can add to your notes. There are also no limits about how you can name your tags: it can be as simple as that *linky notes* or it can be *project_status: in progress*. Tags are also stored under the unique ids.

You can have an **overview of all of your tags** on `/tags` page ordered alphabetically, so you can be up to date with all topics you were interested.

Every **tag works as a link**, so you can click on any tag in any note or on the tags page and you will be redirected to the page with notes filtered by that tag, where you can continue filtering notes by adding new tags to the filter.

## Filtering by tag/s 🔎

You can **filter** your notes **by one or many tags simultaniously** using the built-in tag search engine.

Every **search/ filter session** generates a **dedicated URL**, so you can navigate between search/filter sessions or save the link to particular session.

## Multiline Text 📄

Every note is accepting Markdown syntax. Even if you don't know, what is it, or you wouldn't be using Markdown, it enables you to sava a multiline text: to start a new paragraph you just need to leave an empty line after the previous paragraph (by clicking ENTER). This is the most basic usage of Markdown in this app.

## Markdown Formatting ✨

As mentioned before, you can **format your notes with Markdown**. Using basic Markdown syntax enables you to add:

- headers (h1-h6)
- links
  - external => open a new tab,
  - internal => redirecting to linked existing note inside the app
- lists
  - ordered,
  - unordered,
  - mixed,
  - nested,
- tables,
- text decoration
  - bold,
  - italicized,
  - strikethrough,
- checked & unchecked checkboxes (to simulate todo-lists),
- images (published on Internet),
- horizontal rules,
- footnotes

to your notes.

Check out [my app's guide](https://linkynotes.com/guides/markdown-guide) to learn how to use basic Markdown in a few minutes!

These features can **make your notes more readable, unique and containing a lot of useful references and additional materials**. But... you'll discover, that you can do much more with your notes' content!

## Referencing already existing notes (internal links) 🔗

As mentioned before, you can add **internal links to your notes**, what means, that you can refer to other existing note. To do that you need to copy note's id and pass it into your link, like that: `[check out this note](/notes/note-id-goes-here)`. That's all you need. Now, when you click this this link, you'll be redirected to refered note inside the app.

You **combine this feature with any other Markdown enabled features** mentioned before & create:

- lists (and todo lists) of linked notes inside some note *(for example, you can create a note which will be the description of the project or a book or a long article you're writing & such list of linked notes may be a table of content of all project's/ book's/ article's notes)*,
- put the reference to some note in a footnote,
- put links to notes to tables etc.

## HTML with inline CSS styling

In addition to formatting your notes with Markdown syntax, you can also use HTML with optional inline CSS styling!

Of course, that requires some basic knowledge of HTML & CSS, but if you are really motivated to turn your note into complete web page full of colors, shapes, embed elements and any layout, than you can learn it online for free pretty fast.

## Add videos, images &... even the whole websites to your notes!

As been mentioned, thanks to ability of using HTML in your notes, you can also add different embed elements to your note. For example, you can add... the whole website (for instance, Linky Notes) to your notes by adding this: `<iframe src="https://linkynotes.com" width="100%" height="500px" title="Linky Notes About Page"></iframe>`!

I will add some basic tutorial on the topic soon...

## Cloud Database => Sync on all devices 💻🖥📱

All your notes, tags and data are stored in a Cloud, so you can use the app on any device with the Internet connection (mobile, tablet, laptop, desktop) and have access to your synced notes anywhere.

## No folders, no labels, no hierarchial structure. Your customizable management system only

Although the linky_notes app has only a few simple functionalities, it offers endless possibilities for organizing, searching and using your notes in the way, which is impossible to many other note apps around. No need for folders, categories, labels etc., so there is no structure or hierarchy to manage (and strugle) with. You can do all of this using tags! You can even simulate other apps (I will add some examples soon).

No more overthinking about how to organize or find your notes. You'll save a tone of time & mental resources you can use for creative activities, learning or developing projects.

To read more, how to efficiently organize your notes, [read this app's tutorial](https://linkynotes.com/guides/app-guide).

## Dark Mode 🌙

You can use the app in light & dark mode. The app will automatically detect if you're preferring using dark or light mode on your system and change the mode of the app accordingly. You can switch the mode anytime by clicking the mode button in app's navigation menu/ bar. 

## Privacy 🔐

All your notes & data are **private**, what means that only the logged owner/ author of the note can see it. If you won't share your password with anyone, your data is absolutely secure.

## Tech Stack 🔧

| Technology | 2021-2024 | January 2025 |
| --- | :-: | :-: |
| React | 18.2 | 19.0.0 |
| Next.js | ❌ | 15.1.4 |
| TypeScript | ❌ | 5+ |
| Firebase | 9.1 | 11.1.0 |
| Firebase Realtime Database | ✅ | ✅ |
| React Bootstrap | 2.4 | 2.10.7 |
| Bootstrap | 5.1 | 5.3.3 |
| React Icons | 4.4 | 5.4.0 |
| React Markdown | 8.0 | 9.0.3 |
| React Router | 6.3 | ❌ |
| React Redux | 8.0 | ❌ |
| Redux Toolkit | 1.8 | ❌ |
| JavaScript | ✅ | ❌ |
| Bootstrap Icons | 1.6 | ❌ |
| GitHub Pages | 3.2 | ❌ |
| PWA | ✅ | ❌ |

## Sitemap 🧭

### Public Routes

```
/(about/home page)
/guides
  /app-guide
  /markdown-guide
  /inner-app-guide
/signin
/signup
/password-reset
```

### Private Routes

```
/notes(?tags=...?sortBy=...)
  /add
  /[slug] (note id)
    /update
/tags
```