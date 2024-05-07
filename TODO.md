# 🚀 TODO (future/maybe todo list for myself)

## Future/maybe changes/ updates for an EXISTING APP in current stack without major changes

*do these improvements & freeze maintaining/ adding new features, but rathr start from a scratch with the new app*

- `enable searching/ filtering notes via dialog or side menu while creating/ updating the current note to easily grab links/ notes ids we want to refer`.
<br>⚠️ *But now this can be done by opening an app in 2 separate browser windows and use one to browse the notes, and another to create/ update a note*.
- `show loading spinner when init data loads`
- enable showing `lastly updated notes`, not only lastly created
- fix `filtering/searching tags bug`
- (*if this won't force to rewrite the app - check it*) `add onSnapshot listener to sync state in all opened app instances`
- tags on top of the note or aside ???
- `add suggestions` below for users in some of the guides:
  - split bigger/growing notes into smaller one unit-notes & then reuse/combine them into notes with internal links, table-of-content-like notes
  - add more internal links to other notes
  - when note A describes smth and you use a term described in the note B, make a link to the term instead of describing term B
  - if some tag has really a lot of notes linked & is a vast area, like *web development*, then create it's own note as a table-of-content-like note or index-note with links to other related tags-chapters or separate notes as you're trying to write an article or a chapter in the book to organize them

## Features/ ideas for a an app rewritten from scratch or the new one

### REWRITE/ UPGRADE TECH STACK

- migrate to `Next.js` (but keep PWA or maybe just adding shortcut to main screen is enough?) + static about pages & guides
- migrate to `TypeScript`
- get rid of/ do not use ~~`Redux`~~
- use `Firestore` instead of ~~`RTDB`~~
- optimize data loading, filtering & querying
  - do not load all notes & tags on app mount
  - pagination
  - filter notes & tags using Firestore queries
  - implement Firebase Caching
  - this leads to rewriting db schemas
- split md editor like I built ???
- show related notes (based on tags & links)
- show backlinks (*need to expand note db scheme*)
- show a number of tagged notes near the tag (*need to change tag data scheme*)
- auto create mentioned in sugestions above tag-page for every tag ??? 

### NEW FEATURES



