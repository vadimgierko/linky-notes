import MarkdownRenderer from "../components/MarkdownRenderer";

const CONTENT = `
# How to create an inner app in *linky_notes*

---

## Basic variant/ approach (*issue tracker app example*)

### Issue

- start a new note, which will simulate an issue
- add ${"`"}issue tracker${"`"} tag to initiate Issue Tracker
- add ${"`"}issue${"`"} tag to initiate this particular issue
- add ${"`"}open${"`"}, ${"`"}in progress${"`"}, ${"`"}resolved${"`"} or any other tag, which will indicate an issue status
- add tags for other issue's features, like priority, substatus etc.
- add tag with the name of the project an issue belongs to
- you can assign other people by adding tag with their name
- finally add text content & use the power of markdown syntax to organize & style the content in the way you want

---

Creation & update dates are created automatically, so you don't need to worry about it.

Also remember, that you can easily edit any text content & tags (by adding and deleting them).
You can always add brand new tags to the app.

---

## Variation using combined/complex tags

Instead of adding ${"`"}open${"`"}, ${"`"}in progress${"`"}, ${"`"}resolved${"`"} or any other tag,
which will indicate an issue status, you can add ${"`"}status:open${"`"} or ${"`"}status:resolved${"`"}.

Do the same with tags, which indicate substatuses/ milestones, priority etc.

This solution may better than basic version, because:

- this kind of tags is more readable,
- in this case tags ${"`"}open${"`"} & ${"`"}status:open${"`"} will be used in different situations & prevent errors,
when we want to filter issues which are open & get notes (which are not even an issue) with tag ${"`"}open${"`"} instead.

## Flexibility/ Customization

These approaches gives you enormous flexebility of how you can design you tracker & issues. You can add new types, catogories, anything you want. You can create todo lists inside your issues & projects notes, have links, refer to another issues using their links etc. Imagination is the only limit.

Remeber that you can always add brand new tags to the app, what means that **there is no limit of features, categories & functionalities you can add**!

## Future use

This example & idea proves how powerful is *linky_notes* app and how powerful is the ability to add tags to any kind of items & using markdown syntax inside them.
Every note can be whatever you want & need.

Users can organize anything using tags (and their variations) & inner links to other notes.
`

export default function InnerAppGuide() {
	return <MarkdownRenderer markdown={CONTENT} />;
}