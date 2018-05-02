import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class Bookshelf extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }
  render() {
    const { books, onChangeShelf, shelfName } = this.props
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{ shelfName }</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map((book) =>
                <Book
                  key={ book.id }
                  book={ book }
                  books={ books }
                  onChangeShelf={ onChangeShelf }
                />
              )}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}


export default Bookshelf