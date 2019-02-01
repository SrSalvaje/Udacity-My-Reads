import React, {Component} from "react"
import {Link} from "react-router-dom"
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp' 
 import sortBy from 'sort-by'
import BookList from "./BookList"


class SearchBook extends Component {
    state={
        results:[],
        query:""
    }

    search=()=>{
        BooksAPI.search()
    }

    updateQuery=(query)=>{
        this.setState({query: query.trim()})
    }

    render(){
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/"><button className="close-search">Close</button></Link>
                    <div className="search-books-input-wrapper">

                    <input 
                    type="text" 
                    placeholder="Search by title or author"
                    value={this.state.query}
                    onChange={(e)=> {this.updateQuery(e.target.value)
                    this.setState({query:e.target.value})}
                    }/>
                </div>
            </div>
            <div className="search-books-results">
                {/* <BookList/> */}
            </div>
          </div>

        )
    }
}
export default SearchBook