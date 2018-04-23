import React, { Component } from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class SearchPage extends Component {
  static PropTypes = {
    onUpdateBook: PropTypes.func.isRequired
  }

  state = {
    books: [],
    query: ''
  }

  addToShelf = (books) => {
    const booksToAdd = books.map(book => {
      let currentBooks = books.filter(selectedBook => {
        return book.id === selectedBook.id;
      })
      let targetShelf = currentBooks.length & currentBooks[0].shelf
      if (targetShelf) {
        return { ...book, ...{ shelf: targetShelf } }
      } else {
        return book
      }
    })
    return booksToAdd
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    BooksAPI.search(this.state.query).then((books) => {
      if (typeof books !== 'undefined') {
        let results = this.addToShelf(books);
        this.setState({ books: results })
      }
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search"></Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {typeof this.state.books !== 'undefined' && (
              this.state.books.map((book) =>
                <Book
                  key={book.id}
                  book={book}
                  onUpdateBook={(book, shelf) => {
                    this.props.onUpdateBook(book, shelf)
                  }}
                />
              )
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage