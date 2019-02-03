import React, {Component} from 'react'


class SelectShelf extends Component {
    
    state={
        shelf: this.props.book.shelf || "none"

    }
    
    componentDidMount(){
       if(typeof this.props.isBookInShelf === "function"){
           this.props.isBookInShelf(this.props.book);
           this.setState({shelf:this.props.book.shelf});
       }
    }
    
    
  
    changeShelf = (shelf)=>{
       
        //sets state of book to chosen shelf
        this.setState({shelf:shelf});
        //stores previous shelf
        const prevShelf=this.props.book.shelf,
        //stores new shelf
        newShelf=shelf;
        //not sure if needed (or if anti pattern, isnt being changed already by the first set state?)
        this.props.book.shelf=newShelf;
        //calls the update shelf function
        this.props.updateShelf(this.props.book, newShelf, prevShelf)
      } 

    render(){
        const shelf=this.state.shelf;
        return (
            
            <div className="book-shelf-changer">
                <select value={shelf} onChange={(e)=>this.changeShelf(e.target.value)}>
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