import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../common/template/Header'
import Shelf from '../components/Shelf'

export default class Home extends Component {

    handler = (book, event) => {
        this.props.handler(book, event)
    }

    filterBooksByShelf(shelf) {
        return this.props.books.filter(book => book.shelf === shelf)
    }

    render() {
        return (
            <div className="list-books">
                <Header title="MyReads" />
                <div className="list-books-content">
                    <div>
                        <Shelf title="Currently Reading"
                            books={this.filterBooksByShelf('currentlyReading')}
                            handler={this.handler} />
                        <Shelf title="Want to Read"
                            books={this.filterBooksByShelf('wantToRead')}
                            handler={this.handler} />
                        <Shelf title="Read"
                            books={this.filterBooksByShelf('read')}
                            handler={this.handler} />
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}