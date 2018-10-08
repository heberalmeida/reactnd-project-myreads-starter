import React, { Component } from 'react'
import propTypes from 'prop-types'

class Book extends Component {
    handleBookUpdate (event) {
        const shelf = event.target.value
        this.props.handler(this.props, shelf)
    }

    render() {
        const shelf = this.props.shelf || 'none'
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 188,
                            backgroundImage: `url("${this.props.imageLinks.thumbnail || ''}")`
                        }}></div>
                        <div className="book-shelf-changer">
                            <select value={shelf} onChange={this.handleBookUpdate.bind(this)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.title}</div>
                    <div className="book-authors">{this.props.authors ? this.props.authors.join(', ') : 'None'}</div>
                </div>
            </li>
        )
    }
}

Book.propTypes = {
    handler: propTypes.func.isRequired,
    shelf: propTypes.string.isRequired,
    'imageLinks.thumbnail': propTypes.string,
    authors: propTypes.array.isRequired
}

export default Book