import React from 'react'
import {Route} from "react-router-dom"
import * as BooksAPI from './BooksAPI'
import Bookshelf from "./BookShelf"
import AddBook from "./AddBook"
import './App.css'
import SearchBook from './SearchBook';

class BooksApp extends React.Component {
  state={
    //main page book shelfs
    currentlyReading:[],
    wantToRead:[],
    read:[],
    //search page states
    searchResults:[],
    query:"",
    //used conditionally render message if no matchiong items are found
    error:false
  }
  componentDidMount(){
    //gets all the books
    BooksAPI.getAll().then((books)=>{
      //and sorts them by shelf
      this.setState({currentlyReading:books.filter((book)=>book.shelf==="currentlyReading"), 
        read:books.filter((book)=>book.shelf==="read"), 
        wantToRead:books.filter((book)=>book.shelf==="wantToRead") 
      });  
    })
  }

  //passed as props to <SearchBook/> called after books from search result are mounted
  isBookInShelf=(book)=> {
    //makes an array with all books in shelfs and flattens it
     const allBooks=[this.state.wantToRead, this.state.currentlyReading, this.state.read].flat();
    //then checks if any of them match the book (from search results) whose shelf is being checked
     let bookMatch=allBooks.filter((bk)=>bk.id===book.id);
    //if there is a match, it sets its shelf to the corresponing one
    if(bookMatch.length!==0){
      book.shelf=bookMatch[0].shelf;
    } 
  }
  //called by the search page
  searchBooks = (e)=>  {
    const query=e.target.value;
    this.setState({query});

    if(query) {
        BooksAPI.search(query.trim()).then((books)=>{
            if(books.length > 0){
                this.setState(
                  //sets the search results books shelf to none **This could be a good place to simplify code by using this.isBookInShelf 
                  //instead of with componentDidMount
                  {searchResults: books.map((bk)=>{
                    bk.shelf="none"; 
                    return bk}), 
                    error: false})
            }else{
              //id there are no search results or an error occurs during sorting, empties the array and sets the condition to trigger messgae instead of search results
                this.setState({searchResults:[], error: true});
            } 
        }); 
        //called if query is empty
    } else { 
      this.setState({searchResults:[], error: false});
      }
};

//used to move books between shelfs 
  updateShelf=(book,newShelf, oldShelf, searchResults)=>{
    if(newShelf!=="none" && oldShelf !== "none"){
      BooksAPI.update(book, newShelf).then((response)=>{
        this.setState({[newShelf]:[...this.state[newShelf], book],//***Hey Reviewer, is there a prefered or a "React" way of adding items to a state array?
          [oldShelf]:this.state[oldShelf].filter((bk)=>bk.shelf===oldShelf) 
        }) 
      });

    }else if(oldShelf !== "none"){
      BooksAPI.update(book, newShelf).then((response)=>{
        this.setState({[oldShelf]:this.state[oldShelf].filter((bk)=>bk.shelf===oldShelf)});
      })
    }else if(oldShelf==="none"){
      BooksAPI.update(book, newShelf).then((response)=>{
        this.setState({[newShelf]:[...this.state[newShelf],book]});
      })
    }
    
  }

  render() {
    return (
      <div className="app">
     <Route exact path="/" render={()=>(
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
      <div className="list-books-content">
        <Bookshelf title="Currently Reading" Books={this.state.currentlyReading} updateShelf={this.updateShelf} />
        <Bookshelf title="Want to Read" Books={this.state.wantToRead}  updateShelf={this.updateShelf} />
        <Bookshelf title="Read" Books={this.state.read}  updateShelf={this.updateShelf} />
      </div>
    </div>

     )}/>
      <Route path="/search" render={()=>(
        <SearchBook updateShelf={this.updateShelf} 
        searchBooks={this.searchBooks} 
        query={this.state.query} 
        searchResults={this.state.searchResults} 
        error={this.state.error}
        isBookInShelf={this.isBookInShelf}
        />
        
      )}/>
        <AddBook/>
      </div>

    )  
  }
}

export default BooksApp
