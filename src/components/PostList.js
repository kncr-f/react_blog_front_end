import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom'
import { api } from '../api';

const PostList = () => {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        api().get('/posts')
            .then((response) => { setPostList(response.data) })
            .catch((error) => { console.log(error) });

    }, [])

    return (
        <React.Fragment>
            <Link to={'/addpost'} className="ui right floated button">Add Post</Link>
            <div className="ui relaxed divided list">

                {postList.map((post) => {
                    return (
                        <div key={post.id} className="item">
                            <i className="large github middle aligned icon"></i>
                            <div className="content">
                                <Link to={`/posts/${post.id}`} className="header">{post.title}</Link>
                                <div className="description">{post.created_at}</div>
                            </div>
                        </div>)
                })}
            </div>

        </React.Fragment>

    )
}

export default PostList;