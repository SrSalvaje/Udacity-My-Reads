import React from 'react'
import * as BooksAPI from './BooksAPI'
import Bookshelf from "./BookShelf"
import AddBook from "./AddBook"
import './App.css'

class BooksApp extends React.Component {
  state={
    //AllBooks:[],
    Current:[],
    Future:[],
    Done:[]
  }
  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({Current:books.filter((book)=>book.shelf==="currentlyReading")});
      this.setState({Future:books.filter((book)=>book.shelf==="wantToRead")}); 
      this.setState({Done:books.filter((book)=>book.shelf==="read")});  
    })
  }
  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <Bookshelf title="Currently Reading" Books={this.state.Current} />
            <Bookshelf title="Want to Read" Books={this.state.Future}/>
            <Bookshelf title="Read" Books={this.state.Done}/>
          </div>
        </div>
        <AddBook/>
      </div>

    )  
  }
}

export default BooksApp
