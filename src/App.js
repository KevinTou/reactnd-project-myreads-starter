import React from 'react'
import BookLibrary from './BookLibrary'
import SearchPage from './SearchPage'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    search: ''
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  // Check to verify if the book is new or already in the shelf
  isBookOnShelf(book) {
    for (let i = 0; i < this.state.books.length; i++) {
      if (this.state.books[i].id === book.id) {
        return true
      }
    }
    return false
  }

  updateBookState(book, shelf) {
    if (this.isBookOnShelf(book)) {
      BooksAPI.update(book, shelf)
      this.setState(prevState => {
        let books = prevState.books.map(b => {
          if (b.id !== book.id) {
            return b;
          } else {
            return { ...b, ...{ shelf } }
          }
        })
        return { ...prevState, ...{ books } }
      })
    } else {
      this.setState(prevState => {
        let newBook = { ...book, ...{ shelf } };
        let books = prevState.books.concat(newBook)
        return { ...prevState, ...{ books } }
      })
    }
  }

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Route exact path="/" render={() => (
            <BookLibrary
              onUpdateBook={(book, shelf) => {
                this.updateBookState(book, shelf)
              }}
              currentlyReadingBooks={this.state.books.filter((b) => b.shelf === "currentlyReading")}
              wantToReadBooks={this.state.books.filter((b) => b.shelf === "wantToRead")}
              readBooks={this.state.books.filter((b) => b.shelf === "read")}
            />
          )} />
          <Route path="/search" render={() => (
            <SearchPage
              onUpdateBook={(book, shelf) => {
                this.updateBookState(book, shelf)
              }}
            />
          )} />
        </div>
      </div>
    )
  }
}

export default BooksApp
