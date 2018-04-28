import React, { Component } from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

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
      book.shelf = "none"
      this.props.books.map(books => {
        if (book.id === books.id) {
          book.shelf = books.shelf;
        }
      });
      return book;
    })
    return booksToAdd
  }

  updateQuery = (query) => {
    this.setState({ query })
    BooksAPI.search(this.state.query).then((books) => {
      if (typeof books !== 'undefined') {
        let results = this.addToShelf(books);
        this.setState({ books: results })
      } else {
        this.setState({ books: [] })
      }
    })
  }

  render() {
    let visibleBooks
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      visibleBooks = this.state.books.filter((book) => match.test(book.title))
    } else {
      visibleBooks = this.state.books
    }

    visibleBooks.sort(sortBy('title'))

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
            {typeof this.state.books !== 'undefined' && this.state.query !== '' && (
              visibleBooks.map((book) =>
                <Book
                  key={book.id}
                  book={book}
                  books={this.props.books}
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