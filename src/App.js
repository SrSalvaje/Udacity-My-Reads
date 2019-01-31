import React from 'react'
import * as BooksAPI from './BooksAPI'
import Bookshelf from "./BookShelf"
import './App.css'

class BooksApp extends React.Component {
  
  
  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <Bookshelf title="Currently Reading" />
            <Bookshelf title="Want to Read"/>
            <Bookshelf title="Read"/>
          </div>
        </div>
      </div>

    )
     
  }
}

export default BooksApp
