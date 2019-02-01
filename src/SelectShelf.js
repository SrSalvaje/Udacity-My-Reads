import React, {Component} from 'react'


class SelectShelf extends Component {
    
    state={
        shelf: this.props.book.shelf || "none"

    }
    
    changeShelf = (book, shelf)=>{
        this.setState({shelf:shelf});
        const prevShelf=book.shelf,
        newShelf=shelf
        book.shelf=newShelf
        this.props.updateShelf(book, newShelf, prevShelf)
      } 

    render(){
        return (
            <div className="book-shelf-changer">
                <select value={this.state.shelf} onChange={(e)=>this.changeShelf(this.props.book, e.target.value)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading" >Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default SelectShelf