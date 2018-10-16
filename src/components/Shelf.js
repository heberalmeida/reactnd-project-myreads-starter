import React from 'react'
import propTypes from 'prop-types'
import Book from './Book'

const Shelf = props => {
    const { books, title } = props
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{ title }</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <li key={book.id}>
                            <Book handler={props.handler} book={book} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
  }

Shelf.propTypes = {
    handler: propTypes.func.isRequired
}

export default Shelf