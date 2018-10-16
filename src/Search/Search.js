import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from '../components/Book'
import { Debounce } from 'react-throttle'

export default class Search extends Component {
  state = {
      searchResults: [],
      query: ''
  }

  updateQuery = (query) => {
      if (query !== this.state.query) {
          this.setState({
              query: query
          })
          if (query.length)
              this.searchBooks(this.state.query)
      }
  }

  handler = (book, event) => {
      this.props.handler(book, event)
  }

  searchBooks(query) {
      BooksAPI.search(query).then((searchResults) => {
          if (searchResults) {
              this.props.books.forEach((book) => {
                  if (searchResults.length)
                      searchResults.map((b) => {
                          return b.id === book.id ? (b.shelf = book.shelf, b) : b
                      })
              })
              this.setState({
                  searchResults
              })
          }
      })
  }
  render() {
    const { searchResults } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="400" handler="onChange">
                <input type="text" placeholder="Search by title or author"
                    onChange={event => this.updateQuery(event.target.value)} />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.length ? searchResults.map((book) => (
              <li key={book.id}>
                <Book handler={this.props.handler} book={book} />
              </li>
            )) : ''}
          </ol>
        </div>
      </div>
    )
  }
}