# 🚀 TODO (future/maybe todo list for myself)

## Future/maybe changes/ updates for an EXISTING APP

*do these improvements & freeze maintaining/ adding new features, but rathr start from a scratch with the new app*

- `enable searching/ filtering notes via dialog or side menu while creating/ updating the current note to easily grab links/ notes ids we want to refer`.
<br>⚠️ *But now this can be done by opening an app in 2 separate browser windows and use one to browse the notes, and another to create/ update a note*.
- `show loading spinner when init data loads`
- enable showing `lastly updated notes`, not only lastly created
- fix `filtering/searching tags bug`
- (*if this won't force to rewrite the app*) `add onSnapshot listener to sync state in all opened app instances`

## Features/ ideas for a new note-taking app from scratch

### 🚀 TO START 👉 Do not repeat same tech stack, db & app logic mistakes

- migrate to Next.js (but keep PWA or maybe just adding shortcut to main screen is enough?)
- migrate to TypeScript
- get rid of/ do not use Redux
- use Firestore instead of RTDB
- optimize data loading, filtering & querying
  - do not load all notes & tags on app mount
  - pagination
  - filter notes & tags using Firestore queries
  - implement Firebase Caching
  - this leads to rewriting db schemas

### NEW FEATURES (*I cannot reveal most of them for now, because this repo is public*)



