import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Home from './Home/Home'
import Search from './Search/Search'

class BooksApp extends Component {
    state = {
        books: []
    }

    async componentDidMount() {
        const books = await BooksAPI.getAll()
        this.setState({ books })
    }

    updateShelf = (book, e) => {
        let newBooks = this.state.books

        const selectedShelf = e.target.value
        book.shelf = selectedShelf

        BooksAPI.update(book, selectedShelf).then(() => {
            newBooks = newBooks.map((b) => b.id === book.id ? (b.shelf = selectedShelf, book) : (b))
                .filter(book => book.shelf !== 'none')

            if(newBooks.every(b => b.id !== book.id))
                newBooks.push(book)

            this.setState({
                books: newBooks
            })

        })
    }

    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <Route exact path="/" render={() => (
                        <Home books={this.state.books} handler={this.updateShelf} />
                    )} />
                    <Route exact path='/search' render={() => (
                        <Search books={this.state.books} handler={this.updateShelf} />
                    )} />
                </div>
            </BrowserRouter>
        )
    }
}

export default BooksApp
