import React, {Component} from "react"
import {Link} from "react-router-dom"
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp' 
 import sortBy from 'sort-by'
import BookList from "./BookList"


class SearchBook extends Component {
    state={
        results:null,
        query:""
    }

    componentDidUpdate(prevProps, prevState){
        let results
        if(prevState.query!==this.state.query /* && this.state.results===null */){
            BooksAPI.search(this.state.query).then(function(result){
                results=result.map((bk)=>{
                    bk.shelf="search";
                    return bk
                });
                console.log(results)
                return results;
            }).then((results)=>{
                
                if(results){
                    this.setState({results:results})
                }else{
                    this.setState({results:null})
                }
            }).catch((error)=>{
                if(error==="empty query" || error === 403){
                    this.setState({results:null}) 
                }
            })
            
        }        
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
                    onChange={(e)=> {this.updateQuery(e.target.value)}
                    }/>
                </div>
            </div>
            <div className="search-books-results">
                <BookList Shelf="" Books={this.state.results} updateShelf={this.props.updateShelf}/>   
            </div>
          </div>
          
        )
    }
}
export default SearchBook