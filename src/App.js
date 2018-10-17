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
        const shelf = e.target.value
        if (book.shelf !== shelf)
            BooksAPI.update(book, shelf).then(() => {
                BooksAPI.getAll().then(books => {
                    this.setState({ books })
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
