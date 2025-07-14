# App Refactor Notes

## App Structure

- ## Navbar
  - App Name
  - Navigation
    - Icons
      - Create Note => `/notes/add`
      - Search => `/notes`
    - Dropdown Button
      - links
        - private (dynamic, user's data dependent)
          - notes (with notes count) => `/notes`
          - tags (with tags count) => `/tags`
        - public (static)
          - about => `/`
          - guides => 3 guides links
      - mode icon button => redirects to same page...
      - log out icon button => `/`
- ## Main = Wrapped Routes/Pages
  - ### Static
    - `/` => About Page
    - `/guides/[guide]` => static guides' pages
  - ### Dynamic
    - `/notes` + `?tags=[tagId]+[tagId]...&sortBy=[sortBy]`
      
      `<TagsSearchBar />`

      `<FoundTagsList />` = link-buttons that add found tag to selected search tags & adding selected tag id to the url search params string

      `<SelectedSearchTags />` = buttons with trash icon to remove from selected

      `<SortBySelect />` to apply selected order by method to filtered notes by selected tags

      `<FilteredNotesList />` = `<NoteCard />[]`
      - `/add`
      - `/[noteId]`
        - `/update`
    - `/tags`
- ## Footer