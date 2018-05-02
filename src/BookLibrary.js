import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class BookLibrary extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  render() {
    const { books, onChangeShelf } = this.props
    const currentShelf = [
      { type: 'currentlyReading', title: 'Currently Reading' },
      { type: 'wantToRead', title: 'Want to Read' },
      { type: 'read', title: 'Read' }
    ]

    return (
      <div className="list-books-content">
        {currentShelf.map((shelf, index) => {
          const booksOnShelf = books.filter(book => book.shelf === shelf.type)
          return (
            <div className="bookshelf" key={index}>
              <h2 className="bookshelf-title">{shelf.title}</h2>
              <div className="bookshelf-books">
                <Bookshelf
                  books={booksOnShelf}
                  onChangeShelf={onChangeShelf}
                />
              </div>
            </div>)
        })}
        <div className="open-search">
          <Link to="/search" />
        </div>
      </div>
    )
  }
}

export default BookLibrary