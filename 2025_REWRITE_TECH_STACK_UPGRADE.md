# 2025 REWRITE/ UPGRADE TECH STACK

- ✅ ~~migrate to `Next.js`~~
  - ✅ ~~this enables having static `about` pages & `guides`~~
- ✅ ~~gradually migrate to `TypeScript`~~
- ✅ ~~get rid of/ do not use ~~`Redux`~~ & use `Context API` if neccessary~~
- change name *items* => *notes* (in database, CRUD, thunks etc. + migrate from items to notes when log in if there is no notes in db, then delete items folder)
- add users folder to store users data, preferences (mode), settings
- use `Firestore` instead of ~~`RTDB`~~
- optimize data loading, filtering & querying
  - do not load all notes & tags on app mount
  - pagination
  - filter notes & tags using Firestore queries
  - implement Firebase Caching
  - this leads to rewriting db schemas
- auto create mentioned in sugestions above tag-page for every tag ???