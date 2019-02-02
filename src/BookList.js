import React, {Component} from 'react'
import PropTypes from "prop-types"
import SelectShelf from "./SelectShelf"
class BookList extends Component {
    state={
        searchResults:[]
    }


    render(){ 
        return(
            <ol className="books-grid">
                    {this.props.Books && (
                        this.props.Books.map((book)=> (
                     <li key={book.id}>
                         <div className="book">
                            <div className="book-top">
                                <div className="book-cover"style={{ width:128, height:192, backgroundImage:  `url(${book.imageLinks.smallThumbnail})`}}></div>
                                <SelectShelf Books={this.props.Books} book={book} updateShelf={this.props.updateShelf}/>)}
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                         </div>
                     </li>
                )))}            
            </ol>
        )
    }
}

export default BookList