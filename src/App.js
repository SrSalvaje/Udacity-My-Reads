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
  }
  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({currentlyReading:books.filter((book)=>book.shelf==="currentlyReading"), 
        read:books.filter((book)=>book.shelf==="read"), 
        wantToRead:books.filter((book)=>book.shelf==="wantToRead") 
      });  
    })
  }

  updateShelf=(book,newShelf, oldShelf)=>{
    if(newShelf!=="none" && oldShelf !== "search"){
      BooksAPI.update(book, newShelf).then((response)=>{
        this.setState({[newShelf]:[...this.state[newShelf], book], 
          [oldShelf]:this.state[oldShelf].filter((bk)=>bk.shelf===oldShelf) 
        }) 
      });

    }else if(oldShelf !== "search"){
      BooksAPI.update(book, newShelf).then((response)=>{
        this.setState({[oldShelf]:this.state[oldShelf].filter((bk)=>bk.shelf===oldShelf)})
      })
    }else if(oldShelf==="search"){
      BooksAPI.update(book, newShelf)
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
        <SearchBook updateShelf={this.updateShelf}/>
      )}/>
        <AddBook/>
      </div>

    )  
  }
}

export default BooksApp
