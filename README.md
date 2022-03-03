# linky_notes app

## *linky_notes* allows you to create notes with tags & sources

Thanks to that:
- your notes are linked with each other by keywords
- they are grouped by tags & sources
- the note can have few tags, so it would be in a few keywords groups
- you don't need to put notes in folders or do any index or table of content
- that is easy to find the particular note by choosing keywords they consist in search field
- you are saving a tone of time to organize & efficiently use them

### `NOTE! At the moment (from 23.02) I'm adapting this app to a new architecture, data layer management pattern & security rules, so app is not working. Before these changes the app was dedicated only for my personal use, but after a few days anyone would be able to sign up & add notes :-) So stay tuned!`

## Motivation

I've made it first of all for myself. I read a lot, create a lot and... do a lot notes. I couldn't manage hunderds of my notes, so I've decided to build this app. And I'm very proud, that finally, after one year of learning web development, I've solved one of my biggest problems thanks to my own app. Now my notes will be tagged, organized & easy to filter.

At the moment, I can:
- sign in
- **add, update & delete notes** when logged
- add & delete **tags** for my notes or leave it without
- add & delete **source** for my notes or leave it without
- **search/ filter notes by tag/ tags**
- searching mechanism generates link for each searching session, so:
  - I can navigate beetween searching sessions
  - can send searching session link to someone theoretically
- switch dark/ light mode

### Technologies I've used in this project:
- React 17
- React Router 5.2
- React Context & useContext
- Firebase 9.1 (authentication, realtime database, storage)
- Bootstrap 5.1