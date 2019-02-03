import React, {Component} from "react"
import {Link} from "react-router-dom"
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp' 
 import sortBy from 'sort-by'
import BookList from "./BookList"


class SearchBook extends Component {
    render(){
        const {query, searchResults, error, searchBooks, updateShelf}=this.props;
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/"><button className="close-search">Close</button></Link>
                    <div className="search-books-input-wrapper">

                    <input 
                    type="text" 
                    placeholder="Search by title or author"
                    value={query}
                    onChange= {searchBooks}
                    />
                </div>
            </div>
            <div className="search-books-results">
            {searchResults.length>0 && (
                <BookList Shelf={"searchResults"} Books={searchResults} updateShelf={updateShelf}/>  
            )}
            {error && (
                <h2>No books found, try a different search term</h2>
            )}        
            </div>
          </div>
          
        )
    }
}
export default SearchBook