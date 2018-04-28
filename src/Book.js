import React, { Component } from 'react'

class Book extends Component {
  render() {
    const { book } = this.props
    const bookCover = {
      width: 128,
      height: 193,
      backgroundImage: 'url(' + book.imageLinks.thumbnail + ')'
    }
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={bookCover}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={(event) => this.props.onUpdateBook(book, event.target.value)}>
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