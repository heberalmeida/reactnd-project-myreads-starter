import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { search, update, getAll } from '../BooksAPI'
import Book from '../components/Book'

export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            count: 0,
            maxReq: 0,
            allBooks: []
        }
    }

    componentDidMount() {
        getAll().then(allBooks => {
            console.log('all books loaded')
            this.setState({ allBooks })
        })
    }

    setSearchState(books, maxReq) {
        if (maxReq < this.state.maxReq)
            return console.log('a response was invalidated')

        this.setState({ books, maxReq })
    }

    inputSearch(event) {
        const term = event.target.value.trim()
        let count = this.state.count + 1
        this.setState({ count })

        if (!term)
            return this.setSearchState([], count)

        search(term).then((books) => {
            this.setSearchState(books, count)
        }).catch(() => {
            this.setSearchState([], count)
        })
    }

    updateHandler(book, shelf) {
        let allBooks = this.state.allBooks
        let found = false
        allBooks.forEach((oldBook, ind) => {
            if (oldBook.id === book.id) {
                allBooks[ind].shelf = shelf
                found = true
            }
        })

        if (!found) {
            allBooks[book.id] = JSON.parse(JSON.stringify(book))
            allBooks[book.id].shelf = shelf
        }

        this.setState({ allBooks })

        update(book, shelf).then(() => console.log('Book update done'))
    }

    getBook(book) {
        let books = this.state.allBooks

        for (let key in books) {
            if (books[key].id === book.id)
                return books[key]
        }
        return book
    }

    renderBooks() {
        return this.state.books.length ? this.state.books.map((book) => (
			<Book key={book.id} {...this.getBook(book)} handler={this.updateHandler.bind(this)} />
		)) : []
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                            onChange={this.inputSearch.bind(this)}
                            placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.renderBooks()}
                    </ol>
                </div>
            </div>
        )
    }
}