import React, {Component} from 'react'
import PropTypes from "prop-types"
import SelectShelf from "./SelectShelf"
import noCover from "./icons/nocover.jpg"
class BookList extends Component {
    
    render(){
        const {Books, updateShelf,Shelf, isBookInShelf}=this.props;
        
        return(
            <ol className="books-grid">
                    {Books.map((book)=> (
                     <li key={book.id}>
                         <div className="book">
                            <div className="book-top">
                                <div className="book-cover"style={{ width:128, height:192, backgroundImage:  `url(${book.imageLinks && book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail : noCover})`}}></div>
                                <SelectShelf Shelf={Shelf} Books={Books} book={book} isBookInShelf={isBookInShelf} updateShelf={updateShelf}/>)}
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                         </div>
                     </li>
                ))}            
            </ol>
        )
    }
}

export default BookList