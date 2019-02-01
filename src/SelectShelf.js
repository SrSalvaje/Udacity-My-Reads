import React, {Component} from 'react'


class SelectShelf extends Component {
    
    state={
        shelf: this.props.book.shelf || "none"

    }
    
    changeShelf = (shelf)=>{
        this.setState({shelf:shelf});
        const prevShelf=this.props.book.shelf,
        newShelf=shelf;
        this.props.book.shelf=newShelf;
        this.props.updateShelf(this.props.book, newShelf, prevShelf)
      } 

    render(){
        return (
            <div className="book-shelf-changer">
                <select value={this.state.shelf} onChange={(e)=>this.changeShelf(e.target.value)}>
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