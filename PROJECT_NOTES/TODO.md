# Linky Notes MILESTONES / TODO 🚀 (2025-02-09)

## Features to implement for full v1.0

By móc uporządkować swoje
- `notatki` oraz
- `zadania`/`tasks`/`todos` z nich wynikające oraz
- sposoby postępowania (`checklisty`)

brakuje mi takich funkcjonalności/`features` from my unfinished project `setitems`, jak:
- <mark>searching for tags while editing note's content for suggestions</mark>
- <mark>related tag's tags prop for suggestions</mark>
- <mark>`copy/clone` note</mark>
  - with content
  - without content (only tags)
- <mark>`templates`</mark>
- <mark>`draft`s for abandoned notes</mark>
- <mark>`saved`</mark>
  - notes
  - searches ???
- <mark>recent notes</mark> (fetch when user is logged) 10 (limit to last, but it will be last created, not updated...)
- <mark>`nesting` notes</mark>
  ```ts
  interface Note extends PrevNote {
    parents?: {
      [key: string (noteId)]: true
    };
    /**
      * Cannot be optional,
      * becuase note has to have at least 1 child (content).
      */
	  children: {
	  	[key: number]: {
	  		type: "content" | "note",
	  		value: string
	  	}
  	};
    // symbol: ->|
    backlinks?: {
      [key: string (noteId)]: true
    };
    // symbol: |->
    forwardlinks?: {
      [key: string (noteId)]: true
    };
    // symbol: <->
    relatedNotes?: {
      [key: string (noteId)]: true
    };
  }
  ```
  - `parents`
  - `children`
    - `content blocks`
    - `nested notes` (children)
- <mark>`related`</mark>
  - notes 
  - tags
- ?? <mark>Określ zależności pomiędzy tagami</mark> (dodaj możliwość organizacji tagów w apce):
  ```ts
  type KeyValueObject = {
    [key: string]: true;
  }

  interface Tag {
    ...Tag,
    parents?: KeyValueObject;
    children?: KeyValueObject;
    linkedTags?: KeyValueObject;
  }
- <mark>enable łączenie przefiltrowanych notatek w jedną</mark>
- <mark>enable przekształcanie bloków tekstowych notatki w samodzielną (od razu) zagnieżdżoną notatkę</mark>
- <mark>bind same tags in diff languages</mark>
- <mark>`<dialog />` or `<aside />` for (while adding/editing/working with current notes)</mark>:
  - CRUD
  - filtering/searching
    - ~~notes~~
    - tags
- <mark>enable modifying creation date</mark>
- <mark>users CRUD</mark> (store it in Firestore to enable more than 100 users logged simultaniously in free RTDB)

i chyba dopiero wtedy będzie to dla mnie (uwzględniając moje potrzeby) `v1.0`

## Other features

- unregister `serviceWorker` in `gh-pages`
- `Google Analytics`
- video instruction
- static guides made from public notes to showcase the app
- HTML with INLINE CSS GUIDE
- NOTE PAGE UI & FEATURES
  - tags preview checkbox on top of the note or aside ???
  - do not use note cards, but note must be presented as article or post/ page without the border
- split md editor like my own I've built ??? OR content editable (write md & render on the fly)
- `changelog` => Linky Notes has been in development for several years (2021+). Starting with version 1.0 (2025), we are officially tracking changes in a public changelog.
- logo
- gh-like stats
- store fetched tags in
  - `IndexDB` ???
  - `localStorage` ???
  - ✅ ~~`sessionStorage`~~

## Next Versions Major Changes

- enable user connecting their own
  - Firebase project
  - AI key (if implemented)
- implement AI ?
  - for "smart" tags suggestions based on note content
- working with files (`Storage`)
- migrate to `Firestore`