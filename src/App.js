import React from 'react'
import {Route} from "react-router-dom"
import * as BooksAPI from './BooksAPI'
import Bookshelf from "./BookShelf"
import AddBook from "./AddBook"
import './App.css'
import SearchBook from './SearchBook';

class BooksApp extends React.Component {
  state={
    //AllBooks:[],
    currentlyReading:[],
    wantToRead:[],
    read:[],
    searchResults:[],
    query:"",
    error:false
  }
  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({currentlyReading:books.filter((book)=>book.shelf==="currentlyReading"), 
        read:books.filter((book)=>book.shelf==="read"), 
        wantToRead:books.filter((book)=>book.shelf==="wantToRead") 
      });  
    })
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

  updateShelf=(book,newShelf, oldShelf, searchResults)=>{
    if(newShelf!=="none" && oldShelf !== "searchResults"){
      BooksAPI.update(book, newShelf).then((response)=>{
        this.setState({[newShelf]:[...this.state[newShelf], book], 
          [oldShelf]:this.state[oldShelf].filter((bk)=>bk.shelf===oldShelf) 
        }) 
      });

    }else if(oldShelf !== "searchResults"){
      BooksAPI.update(book, newShelf).then((response)=>{
        this.setState({[oldShelf]:this.state[oldShelf].filter((bk)=>bk.shelf===oldShelf)})
      })
    }else if(oldShelf==="searchResults"){
      BooksAPI.update(book, newShelf).then((response)=>{
        this.setState({[newShelf]:[...this.state[newShelf],book]})
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
        error={this.state.error}/>
      )}/>
        <AddBook/>
      </div>

    )  
  }
}

export default BooksApp
