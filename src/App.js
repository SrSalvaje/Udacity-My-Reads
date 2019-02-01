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
    Current:[],
    Future:[],
    Done:[],
    screen: "shelfs" //shelfs or search
  }
  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({Current:books.filter((book)=>book.shelf==="currentlyReading")});
      this.setState({Future:books.filter((book)=>book.shelf==="wantToRead")}); 
      this.setState({Done:books.filter((book)=>book.shelf==="read")});  
    })
  }
/* changeScreen=()=>{
  if(this.state.screen==="shelfs"){
    this.setState({screen:"search"})
    //window.location.href="#search"
  }else{
    this.setState({screen:"shelfs"})
    //window.location.href="#shelfs"
  }
}
 */
  render() {
    return (
      <div className="app">
     <Route exact path="/" render={()=>(
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

     )}/>
      <Route path="/search" render={()=>(
        <SearchBook/>
      )}/>
        <AddBook changeScreen={this.changeScreen}/>
      </div>

    )  
  }
}

export default BooksApp
