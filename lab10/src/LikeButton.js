import React from 'react';
import { getHeaders } from './utils';

class LikeButton extends React.Component {
  
    constructor(props) {
        super(props);

        // binding "this"
        this.toggleLike = this.toggleLike.bind(this);
        this.createLike = this.createLike.bind(this);
        this.removeLike = this.removeLike.bind(this);
    }

    componentDidMount() {
        // fetch posts and then set the state...
    }

    toggleLike() {
        if (this.props.likeId) {
            this.removeLike();
        } else {
            this.createLike();
        }
    }

    createLike() {
        // fetch POST: /api/posts/likes
        const url = '/api/posts/likes';
        const postData = {
            post_id: this.props.postId
        }
        console.log("Create like:", url);
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

    removeLike() {
        // fetch DELETE: /api/posts/likes/{likeId}
        const url = '/api/posts/likes/' + this.props.likeId;
        console.log("Remove like:", url);
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
        const likeId = this.props.likeId;
        const classStyle = (likeId ? 'fas' : 'far') + ' fa-heart fa-lg';
        return (
            <button 
                onClick={this.toggleLike}
                aria-label="Like / Unlike">
                <i className= {classStyle}></i>
            </button>
        );     
    }
}

export default LikeButton;
