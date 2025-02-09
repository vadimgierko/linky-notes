# 🚀 TODO (future/maybe todo list for myself)

## Why there ~~is no~~ IS SENSE to add new features, rewrite the app & why I should ~~freeze & quit~~ KEEP MAINTAINING the app ASAP

- ~~❌ this app's tech stack is outdated~~ ✅ UPDATED STACK,
- ~~❌ the way code is organized is not what I'm used to currently~~ ✅ CODE IS ORGANIZED THE WAY I'M DOING IT NOW,
- ~~❌ domain name is taken~~ ✅ JUST BOUGHT LINKYNOTES.COM,
- ~~❌ even the name of the app is not reflecting what I want it to be anymore~~ ✅ THIS APP IS EXACTLY WHAT IT SHOULD BE & I'M USING IT EVERYDAY FOR 4 YEARS.

## Future/maybe changes/ updates for an EXISTING APP in current stack without major changes

⚠️ *do these improvements & freeze maintaining/ adding new features, but rather start from a scratch with the new app*

- ADD GOOGLE ANALYTICS
- ADD HTML with INLINE CSS GUIDE
- NOTE PAGE UI & FEATURES
  - tags, preview checkbox on top of the note or aside ???
  - do not use note cards, but note must be presented as article or post/ page without the border
  - show related notes (based on tags & links) => now I can search every note for inner links 👉 sprawdzaj notatkę na obecność wewnętrznych linków, by zbudować wizualną sieć, pokazywać backlinki oraz powiązane notatki,
  - show backlinks (*need to expand note db scheme*) => now I can search every note for inner links
- `enable searching/ filtering notes via dialog or side menu while creating/ updating the current note to easily grab links/ notes ids we want to refer`.
<br>⚠️ *Now this can be partially done by opening an app in 2 separate browser windows and use one to browse the notes, and another to create/ update a note, but ⚠️⚠️ the app uses local state after init fetch, so 2 opened windows will be not synced...*.
- split md editor like my own I've built ???
- (*if this won't force to rewrite the app - check it*) `add onSnapshot listener to sync state in all opened app instances`

## 💡 Wewnętrzna Organizacja Notatek w Aplikacji *linky_notes*

🎯 **Ogólny cel** 👉 stworzenie pseudo-podręcznika, łączącego wiedzę zawartą w notatkach

1. Sprawdź tagi, które mają największą liczbę wystąpień (otagowanych notatek) 👉 najprawdopodobniej będą głównymi słowami kluczowymi (*a-la* rozdziały, podrozdziały), z których można utworzyć zbiorczą notatkę organizującą/ spis treści.
1. Określ zależności pomiędzy tagami (🚀 dodaj możliwość organizacji tagów w apce)
1. Wyszukuj notatki tymi tagami i dołączaj/ linkuj do spisu treści + dodaj oznaczenie/ tag `processed note`
1. rozbijaj notatki na mniejsze chunks

## Changelog

Linky Notes has been in development for several years. Starting with version 1.0, we are officially tracking changes in a public changelog.

## 🚀 Nowe funkcjonalności

- Określ zależności pomiędzy tagami (dodaj możliwość organizacji tagów w apce):
  ```ts
  type KeyValueObject = {
    [key: string]: true;
  }

  interface Tag {
    ...Tag,
    parents: KeyValueObject;
    children: KeyValueObject;
    linkedTags: KeyValueObject;
  }
  ```
- Określ zależności pomiędzy notatkami:
  ```ts
  type KeyValueObject = {
    [key: string]: true;
  }

  interface Note {
    ...Note,
    parents: KeyValueObject;
    /**
     * Child = note, text block, etc.
     */
    children: {
      [key: number]: Child; // or {child: Child, index: number}
    }
    backlinks: KeyValueObject;
    forwardLinks: KeyValueObject;
    linkedNotes: KeyValueObject;
  }
  ```