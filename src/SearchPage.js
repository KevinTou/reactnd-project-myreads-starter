import React, { Component } from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class SearchPage extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  state = {
    newBooks: [],
    query: ''
  }

  getBooks = (event) => {
    const query = event.target.value
    this.setState({ query: query })

    if (query) {
      BooksAPI.search(query, 20).then((books) => {
        if(books.length > 0) {
          this.setState({ newBooks: books })
        } else {
          this.setState({ newBooks: []})
        }
      })
    } else {
      this.setState({ newBooks: [] })
    }
  }

  render() {
    const { query, newBooks } = this.state
    const { books, onChangeShelf } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search"></Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={ query }
              onChange={ this.getBooks }
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {typeof newBooks !== 'undefined' && query !== '' && (
              newBooks.map((book) =>
                <Book
                  key={ book.id }
                  book={ book }
                  books={ books }
                  onChangeShelf={ onChangeShelf }
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