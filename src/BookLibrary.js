import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import { Link } from 'react-router-dom'

class BookLibrary extends Component {
  render() {
    return (
      <div>
        <div className="list-books">
          <Bookshelf
            shelfName="Currently Reading"
            books={this.props.currentlyReadingBooks}
            onUpdateBook={(book, shelf) => {
              this.props.onUpdateBook(book, shelf)
            }}
          />
          <Bookshelf
            shelfName="Want to Read"
            books={this.props.wantToReadBooks}
            onUpdateBook={(book, shelf) => {
              this.props.onUpdateBook(book, shelf)
            }}
           />
          <Bookshelf
            shelfName="Read"
            books={this.props.readBooks}
            onUpdateBook={(book, shelf) => {
              this.props.onUpdateBook(book, shelf)
            }}
           />
          <div className="open-search">
            <Link to="/search" />
          </div>
        </div>
      </div>
    )
  }
}

export default BookLibrary