import React from 'react'
import propTypes from 'prop-types'
import Book from './Book'

const Shelf = props => {
    let books = props.books.map((book) => (
			<Book key={book.id} {...book} handler={props.handler}/>
        ))

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books}
                </ol>
            </div>
        </div>
    )
}

Shelf.propTypes = {
    handler: propTypes.func.isRequired,
    books: propTypes.array.isRequired,
    title:  propTypes.string.isRequired
}

export default Shelf