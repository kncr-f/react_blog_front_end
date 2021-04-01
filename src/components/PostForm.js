import {api} from '../api';
import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
 

const PostForm = (props) => {

    const [post, setPost] = useState({ title: "", content: "" });
    const [errorMessage, setErrorMessage] = useState('');

    const onInputChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setErrorMessage("");

        if(props.post?.title){
            //Edit Form
            api()
            .put(`/posts/${props.match.params.id}`,post)
            .then(response=>{
                console.log(response);
                props.history.push(`/posts/${props.match.params.id}`);
            })
            .catch(
                (error) => {
                    setErrorMessage(" You must fill both fields!");
                }
            );
        }else{
            // Add Form
            api()
            .post('/posts', post)
            .then(response => {
                props.history.push('/');
            }).catch((error) => {
                setErrorMessage(" You must fill both fields!");
            })
        }


      


    }

    useEffect(()=>{
        if(props.post?.title && props.post?.content){
            setPost({title:props.post.title, content:props.post.content})
        }
        
    },[props.post])

    return (
        <React.Fragment>
            {errorMessage && 
            <div className="ui error message">
                <div className="header">Error Message</div>
                <p>
                    {errorMessage}
                </p>
            </div>
            }
            
            <div className="ui form">
                <div className="field">
                    <label>Post Title</label>
                    <input
                        value={post.title}
                        name='title'
                        type="text"
                        onChange={onInputChange}
                    />
                </div>
                <div className="field">
                    <label>Post Content</label>
                    <textarea
                        value={post.content}
                        name='content'
                        rows="3"
                        onChange={onInputChange}
                    ></textarea>
                </div>
                <button onClick={handleFormSubmit} className="ui primary button">
                    Send
            </button>
                <button onClick={()=>{
                    props.history.push(`/posts/${props.match.params.id}`)
                }} className="ui button">
                    Cancel
            </button>
            </div>

        </React.Fragment>

    );
};

export default withRouter(PostForm);