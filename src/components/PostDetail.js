
import React, { useEffect, useState } from 'react';
import CommentList from './CommnetList';
import { Link } from 'react-router-dom';
import { api } from '../api';
import DeleteModal from './DeleteModal';



const PostDetail = (props) => {
    const [postDetail, setPostDetail]=useState({});
    const [comments, setComments]= useState([]);
    const { id } = props.match.params;
   
  

const getComments=()=>{
    api().get(`/posts/${id}/comments`)
    .then((response)=>{
        setComments(response.data)
        
    });
}


    useEffect(()=>{ 

        
        api().get(`/posts/${id}`)
        .then((response)=>{
            setPostDetail(response.data);
        })
        .catch((error)=>{
            console.log(error);
        });

       getComments();

            
    },[])
    console.log('comments:',comments)
    const handleCommentSubmit = (event,comment)=>{
        event.preventDefault();
        api().post(`/posts/${id}/comments`,comment)
        .then((response)=>{
            setComments([...comments, response.data]);
            
        }).catch(error=>{console.log(error)})
        
    };

    
   

   
    return (
    <React.Fragment>
        <h2 className="ui header">{postDetail.title}</h2>
        <p>{postDetail.created_at}</p>

        <div className="ui buttons">
            <Link to={`/posts/${postDetail.id}/edit`} className="ui blue button">Edit </Link>
            
            <DeleteModal post={postDetail} push={props.history.push}/>
           
        </div>
        
        <p>{postDetail.content}</p>

        <CommentList comments={comments} updateComments={getComments} handleSubmit={handleCommentSubmit}/>
        
   
        

    </React.Fragment>)
}
export default PostDetail;  