import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MARKDOWN = `
## Headers

*What you need to type:*

${"```"}
# H1
## H2
### H3
...
###### H6
${"```"}

*What you get:*

# H1
## H2
### H3
###### H6

---
## Ordered List

*What you need to type:*

${"```"}
1. First item
2. Second item
3. Third item
${"```"}

*What you get:*

1. First item
2. Second item
3. Third item

---

## Unordered List

*What you need to type:*

${"```"}
- First item
- Second item
- Third item
${"```"}

*What you get:*

- First item
- Second item
- Third item

---
## Bold Text

*What you need to type:*

${"```"}
**bold text**
${"```"}

*What you get:*

**bold text**

---
## Italicized text

*What you need to type:*

${"```"}
*italicized text*
${"```"}

*What you get:*

*italicized text*

---
## Linked text

*What you need to type:*

${"```"}
[This is linked text (click & try)](https://www.this-is-your-link.com)
${"```"}

*What you get:*

[This is linked text (click & try)](https://www.this-is-your-link.com)

---

## Horizontal Rule

*What you need to type:*

${"`---`"}

*What you get:*

---

## Footnote

*What you need to type:*

${"```"}
Here's a sentence with a footnote. [^1]
[^1]: This is the footnote (it appears in the bottom of the page -> check it out!).
${"```"}

*What you get:*

Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.

---

## Strikethrough

*What you need to type:*

${"```"}
~~The world is flat.~~
${"```"}

*What you get:*

~~The world is flat.~~

---
## Task List

*What you need to type:*

${"```"}
- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media
${"```"}

*What you get:*

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

---
## Table

*What you need to type:*

${"```"}
| Column Header 1 | Column Header 2 |
| --------------- | --------------- |
| column content | column content |
| column content | column content |
${"```"}

*What you get:*

| Column Header 1 | Column Header 2 |
| --------------- | --------------- |
| column content | column content |
| column content | column content |
`;

export default function MarkdownGuide() {
	return (
		<>
			<h1 className="text-center mb-3">
				How to format your notes using Markdown Syntax
			</h1>
			<p className="text-center">
				This app allows you to format/ style your notes with built-in Markdown
				Editor. Not all Markdown features are available at the moment, but You
				can create{" "}
				<strong>
					headers, lists, footnotes, tasks lists, strikethrough text, bold &
					italic text, links & tables
				</strong>
				. Check out the examples of what you're able to do below.
			</p>
			<hr />
			<ReactMarkdown children={MARKDOWN} remarkPlugins={[remarkGfm]} />
		</>
	);
}
