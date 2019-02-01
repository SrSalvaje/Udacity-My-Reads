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
      this.setState({currentlyReading:books.filter((book)=>book.shelf==="currentlyReading")});
      this.setState({wantToRead:books.filter((book)=>book.shelf==="wantToRead")}); 
      this.setState({read:books.filter((book)=>book.shelf==="read")});  
    })
  }

  /* changeShelf = (e)=>{
    const prevShelf=e.target.book.shelf,
    newShelf=e.target.value;
    console.log(e.target.value)
    this.setState({prevShelf})
    this.setState({newShelf})
  }  */

  updateShelf=(book,newShelf, oldShelf)=>{
    this.setState({[newShelf]:[...this.state[newShelf], book]})
    this.setState({[oldShelf]:this.state[oldShelf].filter((bk)=>bk.shelf===oldShelf)}) 
    
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
        <SearchBook/>
      )}/>
        <AddBook/>
      </div>

    )  
  }
}

export default BooksApp
