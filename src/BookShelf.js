import React, {Component} from 'react'
import PropTypes from "prop-types"
import BookList from "./BookList"

class BookShelf extends Component {
    state={
        Shelf:""
    }

    componentDidMount(){
        this.setShelf()
    }
    // sets the shelf of this component (used to easily identify shelf)
    setShelf= ()=>{
        if(this.props.title==="Currently Reading"){
            this.setState({Shelf:"currentlyReading"})
        }else if(this.props.title==="Want to Read"){
            this.setState({Shelf:"wantToRead"})

        }else if(this.props.title==="Read"){
            this.setState({Shelf:"read"})
        }
    }

   

    render(){
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                  <BookList Shelf={this.state.Shelf} Books={this.props.Books} updateShelf={this.props.updateShelf} />
                </div>
            </div>
        )
    }
}

export default BookShelf 