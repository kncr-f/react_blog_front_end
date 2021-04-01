import React, { useEffect, useState } from 'react';
import { api } from '../api';
import PostForm from './PostForm'
 
const EditPost = (props)=>{

    const {id}=props.match.params;
    const [post, setPost]=useState({});

    useEffect(()=>{
        api()
        .get(`/posts/${id}`)
        .then(response=>{
            setPost(response.data)
        });
    },[]);
    console.log('editpost',post)

    

    return (<div>
        <h2> Edit Form </h2>
        <PostForm post={post}/>
            </div>
            );
};

export default EditPost; 