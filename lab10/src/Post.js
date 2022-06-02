import React from 'react';
import LikeButton from './LikeButton';
import BookmarkButton from './BookmarkButton';
import { getHeaders } from './utils';

class Post extends React.Component {
  
    constructor(props) {
        super(props);

        this.state = {
            post: props.model
        }
        this.refreshPostDataFromServer = this.refreshPostDataFromServer.bind(this);
    }

    refreshPostDataFromServer() {
        // re-fetch the post
        const url = '/api/posts/' + this.state.post.id;
        fetch(url, {
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({
                post: data
            });
        })
    }

    componentDidMount() {
        // fetch posts and then set the state...
    }

    render () {
        const post = this.state.post;
        return (
            <section
                className='card'>
                <div className="header">
                    <div className="name">{post.user.username}</div>
                    <i className="fas fa-ellipsis-h"></i>
                </div>
                <img src={post.image_url} />
                <p>{post.caption}</p>
                <div className="info">
                    <LikeButton 
                        likeId={post.current_user_like_id}
                        postId={post.id}
                        refreshPost={this.refreshPostDataFromServer}/>
                    
                    <BookmarkButton 
                        bookmarkId={post.current_user_bookmark_id}
                        postId={post.id}
                        refreshPost={this.refreshPostDataFromServer}/>
                </div>
            </section>
        );     
    }
}

export default Post;
