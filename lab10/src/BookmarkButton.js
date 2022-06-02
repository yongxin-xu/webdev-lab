import React from 'react';
import { getHeaders } from './utils';

class BookmarkButton extends React.Component {
  
    constructor(props) {
        super(props);

        // binding "this"
        this.toggleBookmark = this.toggleBookmark.bind(this);
        this.createBookmark = this.createBookmark.bind(this);
        this.removeBookmark = this.removeBookmark.bind(this);
    }

    componentDidMount() {
        // fetch posts and then set the state...
    }

    toggleBookmark() {
        if (this.props.bookmarkId) {
            this.removeBookmark();
        } else {
            this.createBookmark();
        }
    }

    createBookmark() {
        // fetch POST: /api/bookmarks
        const url = '/api/bookmarks';
        const postData = {
            post_id: this.props.postId
        }
        console.log("Create Bookmark:", url);
        fetch(url, {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify(postData)
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            this.props.refreshPost();
        })
    }

    removeBookmark() {
        // fetch DELETE: /api/bookmarks/{bookmarkId}
        const url = '/api/bookmarks/' + this.props.bookmarkId;
        console.log("Remove Bookmark:", url);
        fetch(url, {
            headers: getHeaders(),
            method: 'DELETE'
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            this.props.refreshPost();
        })
    }

    render () {
        const bookmarkId = this.props.bookmarkId;
        const classStyle = (bookmarkId ? 'fas' : 'far') + ' fa-bookmark fa-lg';
        return (
            <button 
                onClick={this.toggleBookmark}
                aria-label="Bookmark / UnBookmark">
                <i className= {classStyle}></i>
            </button>
        );     
    }
}

export default BookmarkButton;
