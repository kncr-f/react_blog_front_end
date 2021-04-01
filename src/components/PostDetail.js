
import React, { useEffect, useState } from 'react';
import CommentList from './CommnetList';
import { Link } from 'react-router-dom';
import { api } from '../api';
import DeleteModal from './DeleteModal';



const PostDetail = (props) => {
    const [postDetail, setPostDetail]=useState({});
    const [comments, setComments]= useState([]);
    const { id } = props.match.params;

    
    //const [comments, setComments]= useState([]);
    // const [display_name, setDisplay_name]=useState('');
    // const [body, setBody]=useState('');
   
  

    useEffect(()=>{ 

        
        api().get(`/posts/${id}`)
        .then((response)=>{
            setPostDetail(response.data);
        })
        .catch((error)=>{
            console.log(error);
        });

        api().get(`/posts/${id}/comments`)
        .then((response)=>{
            setComments(response.data)
            
        });

        //console.log('postdetail:',postDetail);

        
        // });
        // axios.all(
        //     [
        //         axios.get(`https://react-yazi-yorum.herokuapp.com/posts/${id}`),
        //         axios.get(`https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`)

        //     ]
        // ).then(responses=>{
        //     setPostDetail(responses[0].data);
        //     setComments(responses[1].data)})
        //     .catch((error)=>{
        //         console.log(error);
        //         console.log(error);
        //     });
            
    },[])
    console.log('comments:',comments)
    const handleCommentSubmit = (event,comment)=>{
        event.preventDefault();
        api().post(`/posts/${id}/comments`,comment)
        .then((response)=>{
            setComments([...comments, response.data]);
            //setComment(COMMENT_INITIAL_STATE);
        }).catch(error=>{console.log(error)})
        
    };

    
   

   
    return (
    <React.Fragment>
        <h2 className="ui header">{postDetail.title}</h2>
        <p>{postDetail.created_at}</p>

        <div className="ui buttons">
            <Link to={`/posts/${postDetail.id}/edit`} className="ui blue button">Edit </Link>
            {/*<button className="ui red button">Delete</button>*/}
            <DeleteModal post={postDetail} push={props.history.push}/>
           
        </div>
        
        <p>{postDetail.content}</p>

        <CommentList comments={comments} handleSubmit={handleCommentSubmit}/>
        
   
        

    </React.Fragment>)
}
export default PostDetail;  