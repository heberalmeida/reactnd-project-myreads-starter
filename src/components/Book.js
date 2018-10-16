import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Book extends PureComponent {
    render() {
        const { book, handler } = this.props
        return (
            <div className="book">
                <div className="book-top">
                    <div className={`book-cover
                        ${(book.shelf !== 'None') ? book.shelf : ''}`}
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: (book.imageLinks) ?
                                `url(${book.imageLinks.thumbnail})` :
                                `url(https://placeimg.com/128/193/arch/sepia)` }}></div>
                    <div className="book-shelf-changer">
                        <select value={book.shelf || 'None'} onChange={(event) => handler(book, event)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors ? book.authors.join(', ') : 'None'}</div>
            </div>
        )
    }
}

Book.propTypes = {
    handler: PropTypes.func.isRequired
}

export default Book
