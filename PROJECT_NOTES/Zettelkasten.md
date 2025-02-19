# Linky Notes (appeared to be) - an Online Version of Luhmann's Zettelkasten
(VG-ZK-)2025-02-18/1

---

[see also Zettelkasten note](/notes/-O3JdQ2lqosMX1aJXs1g)

---

## Comparison of Zettelkasten & Linky Notes features & functionalities

---

When I started developing Linky Notes App in 2021 I had a clear vison of the app I want build. I wanted to digitalize thousands of my paper notes, interlink them & make them searchable. So the App should enable creating notes, assigning them to tags and linking to other notes, but also filtering those notes by one or more tags simultaniously.

I've achieved that goal and I'm personally using this app for 4 years now & I'm very satisfied with its capabilities. Some time ago I've discovered Zettelkasten method of organizing paper notes & found out, that Linky Notes fully supports Zettelkasten features (see the comparison below 👇).

---

| (analog) ZettelKasten features | | (online) LinkyNotes features |
| :-- | :-- | :-- |
| boxes | | app itself; db |
| A6 format cards (text on the front without taking out) | | `<NoteCard />` component |
| unique id (for fixed placement, abstracted from content; higher order) | | unique auto id |
| red letters/numbers for cross/references to other notes/ tags | | links, tags (are highlighted automatically) |
| tags | | tags |
| search mechanism - keyword index | | search notes by 1 or more tags feautre |
| parallel literature management system (sources) - separate section (note for each item with bibliographical info, which can be a reference for **based on notes (quotes)** or notes **inspired by**)) | | each source can have a separate note with needed metadata & added tag like `#source` and/or tags for title, author |

## Conclusion

Linky Notes App (from its launch in 2021) is a complete online version of/ fully supports (analog) Zettelkasten. Additionally, it doesn't require physical space or paper (but db space instead & Internet) and enables more efficient querying & managing notes & tags.

I can also state, that Linky Notes not only supports, but provide even superior functionalities, like for instance:
- I prefer to organize my notes rather by adding a lot of tags & filtering them after that using a few tags than linking to other notes (this is the usual Zettelkasten approach), so in analog Zettelkasten this would be hard to do;
- editing & formatting digital notes is obviously easier & cleaner using Linky Notes than on paper.

That means, that current version can be officially named as v1 stable version, if support of basic Zettelkasten features is considered as a requirement to reach stable version.

---

## v1+ (Zettelkasten) Version Additional Features
(VG-ZK-)2025-02-18/2

-OJTZPr9ox9-nvVaOs-w

v1 (Zettelkasten) Version Features & overall ease of use can be improved by adding these optional (and possible even now, but manually) features:
- sep modal for notes CRUD & notes search by tags
- easy copy note id/ ready to use link for linking
- auto back/forward links
- search extended to filtering excluding some tags
- auto tag suggestions while note CRUD
- organizing tags (related, children, parents)

---

## Linky Notes v2 Features for more enhanced Zettelkasten features
2025-02-18/2/1

These features:
- nesting tags & notes
- split bigger note into smaller (make them a separate notes, but nested inside the bigger one)
- convert search results into *Consolidation Note for search tags: tagX, tagY, tagZ*

will expand Zettelkasten possibilities
(manually it will be a nightmare to do)
=> this will take querying, organizing & converting
from analog/manual to digital form, enabling even *higher order*
without interrupting the original Zettelkasten *note is an element* approach,
becuase nested notes keep their singular features).