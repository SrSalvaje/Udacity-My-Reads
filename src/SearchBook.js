import React, {Component} from "react"
import {Link} from "react-router-dom"
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp' 
 import sortBy from 'sort-by'
import BookList from "./BookList"


class SearchBook extends Component {
    state={
        searchResults:[],
        query:"",
        error:false
    }



    searchBooks = (e)=>  {
        const query=e.target.value;
        this.setState({query});

        if(query) {
            BooksAPI.search(query.trim()).then((books)=>{
                if(books.length > 0){
                    this.setState({searchResults: books.map((bk)=>{
                        bk.shelf="searchResults"; 
                        return bk}), error: false})
                }else{
                    this.setState({searchResults:[], error: true});
                } 
            });
        } else this.setState({searchResults:[], error: false})
    };

    render(){
        const {query, searchResults, error}=this.state;
    
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/"><button className="close-search">Close</button></Link>
                    <div className="search-books-input-wrapper">

                    <input 
                    type="text" 
                    placeholder="Search by title or author"
                    value={query}
                    onChange= {this.searchBooks}
                    />
                </div>
            </div>
            <div className="search-books-results">
            {searchResults.length>0 && (
                <BookList  Books={this.state.searchResults} updateShelf={this.props.updateShelf}/>  
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