# MyReads Project

This is the 7th assessment project for Udacity's FEND Nanodegree. Static CSS and HTML markup were provided but without any of the React code needed. 


## TL;DR

To launch the project:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Structure
```bash
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms.
├── package.json # npm package manager file. 
├── public
│   ├── favicon.ico
│   └── index.html
└── src
    ├── App.css # Styles for app, code provided by Udacity.
    ├── App.js # This is the root of the app, it was provided as static HTML, all React code was written by me.
    ├──BookShelf.js #Component for the three bookshelfs.
    ├──BookList.js #Component where the books are rendered within BookShelf. 
    ├──SelectShelf.js #Component for the shelf selection dropdown menu of individual books.
    ├──SearchBook.js #Component for the search bar.
    ├──AddBook.js #Component to launch search page.
    ├── App.test.js # Used for testing. Provided with Create React App. No tests Suits were written for this project
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Images provided by udacity; nocover.jpg was made by me.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    |   └──nocover.jpg #used as fallback image for search results.
    ├── index.css # Global styles.
    └── index.js # Used for DOM rendering only.
```



## Backend Server

Code provided by Udacity,  [`BooksAPI.js`](src/BooksAPI.js) contains the methods available to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend.

## Contributing

This repository is an udacity exam and I ikely will not accept pull requests, comments and suggestions are welcomed @ jon.m.h.aresti@gmail.com

