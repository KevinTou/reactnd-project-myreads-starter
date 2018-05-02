import React from 'react'
import BookLibrary from './BookLibrary'
import SearchPage from './SearchPage'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  onChangeShelf = (newBook, newShelf) => {
    BooksAPI.update(newBook, newShelf).then(response => {
      newBook.shelf = newShelf
      var updatedBooks = this.state.books.filter(book => book.id !== newBook.id)
      updatedBooks.push(newBook);
      this.setState({ books: updatedBooks })
    })
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Route exact path="/" render={() => (
            <BookLibrary
              books={ books }
              onChangeShelf={ this.onChangeShelf }
            />
          )} />
          <Route path="/search" render={() => (
            <SearchPage
              books={ books }
              onChangeShelf={ this.onChangeShelf }
            />
          )} />
        </div>
      </div>
    )
  }
}

export default BooksApp
