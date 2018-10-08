import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAll, update } from '../BooksAPI'
import Header from '../common/template/Header'
import Shelf from '../components/Shelf'

export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            books: []
        }
    }

    componentDidMount() {
        getAll().then(books => {
            console.log(books)
            this.setState({ books })
        })
    }

    filterBooksByShelf(shelf) {
        return this.state.books.filter((book) => book.shelf === shelf)
    }

    updateHandler(book, shelf) {
        this.updateBook(book, shelf)
        update(book, shelf).then(() => console.log('Book update done'))
    }

    updateBook(book, shelf) {
        let books = this.state.books
        books.forEach((oldBook, ind) => {
            if (oldBook.id === book.id) {
                books[ind].shelf = shelf
            }
        })
        this.setState({ books })
    }

    render() {
        return (
            <div className="list-books">
                <Header title="MyReads" />
                <div className="list-books-content">
                    <div>
                        <Shelf title="Currently Reading"
                            books={this.filterBooksByShelf('currentlyReading')}
                            handler={this.updateHandler.bind(this)} />
                        <Shelf title="Want to Read"
                            books={this.filterBooksByShelf('wantToRead')}
                            handler={this.updateHandler.bind(this)} />
                        <Shelf title="Read"
                            books={this.filterBooksByShelf('read')}
                            handler={this.updateHandler.bind(this)} />
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}