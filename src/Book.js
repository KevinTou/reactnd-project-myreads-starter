import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  render() {
    const { book, books, onChangeShelf } = this.props
    const bookCover = {
      width: 128,
      height: 193,
      backgroundImage: 'url(' + book.imageLinks.thumbnail + ')'
    }

    let currentBookshelf = 'none'
    
    for (let b of books) {
      if(b.id === book.id) {
        currentBookshelf = b.shelf
        break
      }
    }
    
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={bookCover}></div>
            <div className="book-shelf-changer">
              <select value={ currentBookshelf } onChange={(event) => onChangeShelf(book, event.target.value)}>
                <option value="selection" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.author}</div>
        </div>
      </li>
    )
  }
}

export default Book