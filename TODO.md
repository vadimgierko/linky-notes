# 🚀 TODO (future/maybe todo list for myself)

⚠️ REMEMBER TO UNCOMMENT `basename` BEFORE DEPLOYING ❗❗❗

## Future/maybe changes/ updates for an EXISTING APP in current stack without major changes

*do these improvements & freeze maintaining/ adding new features, but rather start from a scratch with the new app*

- ADD HTML with INLINE CSS GUIDE
- NOTE PAGE UI & FEATURES
  - tags, preview checkbox on top of the note or aside ???
  - do not use note cards, but note must be presented as article or post/ page without the border
  - show related notes (based on tags & links) => now I can search every note for inner links 👉 sprawdzaj notatkę na obecność wewnętrznych linków, by zbudować wizualną sieć, pokazywać backlinki oraz powiązane notatki,
  - show backlinks (*need to expand note db scheme*) => now I can search every note for inner links
- show a number of tagged notes near the tag (*need to change tag data scheme*) => IT IS DONE ALREADY BY THIS CODE:
```JS
const NOTES_ARRAY = Object.keys(window.NOTES).map(id => ({...window.NOTES[id], id}));

const TAGS_ARRAY = Object.keys(window.TAGS).map(id => ({...window.TAGS[id], id}));

function getTagNotes(tagId) {
    return NOTES_ARRAY.filter(note => note.tags[tagId])
}

function getTagsStats() {
    // I want to get a table: | tag | notesNum | id |

    const sortedTagsStats = TAGS_ARRAY.map(tag => {
        const tagNotes = getTagNotes(tag.id);
        return {...tag, notesNum: tagNotes.length};
    }).sort((a, b) => b.notesNum - a.notesNum);

    return console.table(sortedTagsStats)
}

getTagsStats()
```
- `enable searching/ filtering notes via dialog or side menu while creating/ updating the current note to easily grab links/ notes ids we want to refer`.
<br>⚠️ *Now this can be partially done by opening an app in 2 separate browser windows and use one to browse the notes, and another to create/ update a note, but ⚠️⚠️ the app uses local state after init fetch, so 2 opened windows will be not synced...*.
- split md editor like my own I've built ???
- fix `filtering/searching tags bug`
- (*if this won't force to rewrite the app - check it*) `add onSnapshot listener to sync state in all opened app instances`

## 💡 Wewnętrzna Organizacja Notatek w Aplikacji *linky_notes*

🎯 **Ogólny cel** 👉 stworzenie pseudo-podręcznika, łączącego wiedzę zawartą w notatkach

1. Sprawdź tagi, które mają największą liczbę wystąpień (otagowanych notatek) 👉 najprawdopodobniej będą głównymi słowami kluczowymi (*a-la* rozdziały, podrozdziały), z których można utworzyć zbiorczą notatkę organizującą/ spis treści.
1. Określ zależności pomiędzy tagami (🚀 dodaj możliwość organizacji tagów w apce)
1. Wyszukuj notatki tymi tagami i dołączaj/ linkuj do spisu treści + dodaj oznaczenie/ tag `processed note`
1. rozbijaj notatki na mniejsze chunks

---

## 🚀 Nowe funkcjonalności

---

- Określ zależności pomiędzy tagami ( dodaj możliwość organizacji tagów w apce)

```js
note {
  backlinks: [], // noteIds
  linkedNotes: [], // noteIds
}
```



## Features/ ideas for a an app rewritten from scratch or the new one

### REWRITE/ UPGRADE TECH STACK

- migrate to `Next.js` (but keep PWA or maybe just adding shortcut to main screen is enough?) + static about pages & guides
- migrate to `TypeScript`
- get rid of/ do not use ~~`Redux`~~
- items => notes (in database, CRUD, thunks etc. + migrate from items to notes when log in if there is no notes in db, then delete items folder)
- add users folder to store users data, preferences (mode), settings
- use `Firestore` instead of ~~`RTDB`~~
- optimize data loading, filtering & querying
  - do not load all notes & tags on app mount
  - pagination
  - filter notes & tags using Firestore queries
  - implement Firebase Caching
  - this leads to rewriting db schemas
- auto create mentioned in sugestions above tag-page for every tag ???
- notes types???
  - idea (yellow)
  - from the source/ author
  - personal
  - todo list or list (or separate notes, todos and lists?)

### NEW FEATURES



