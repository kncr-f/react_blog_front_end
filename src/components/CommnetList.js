import React, {useState } from 'react';
import CommentForm from './CommentForm';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { api } from '../api';

const CommnetList = (props) => {
    const [comments, setComments]=useState([props.comments]);

    
    console.log('commentlist: ', props);
    const myPostId = props.match.params.id;
   
   
    const handleDelete = (id) => {
        api().delete(`/posts/${myPostId}/comments/${id}`)
        .then(()=>setComments(comments.filter(item=>item.id!==id)));
    };

    // useEffect(() => { setComments(props.comments) }, [props.comments]); 
       

    // const id  = props.comments;
    // console.log(id);
    // console.log(props);

    // useEffect(()=>{
    //     axios.get(`https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`)
    //     .then((response)=>{
    //         setComments(response.data)
    //     });
    // },[]);

    // const handleCommentSubmit = (event,comment)=>{
    //     event.preventDefault();
    //     axios.post(`https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`,comment)
    //     .then((response)=>{
    //         setComments([...comments, response.data]);
    //    const [comments, setComments]= useState([]);     //setComment(COMMENT_INITIAL_STATE);
    //     }).catch(error=>{console.log(error)})

    // };

    return (
        <React.Fragment>
            <h3>Comments</h3>
            {props.comments.map(comment => {
                return (
                    <div key={comment.id} className="ui relaxed list">
                        <div className="item">
                            <div className="content">
                                <span className="header">{comment.display_name}</span>
                                <div className="description">{comment.body}</div>
                            </div>
                            <Link to={`/posts/${comment.post_id}/comments/${comment.id}/edit`} className=" mini ui yellow button">Edit </Link>
                            <button className=" mini ui red button" onClick={() => { handleDelete(comment.id) }} >Delete</button>
                        </div>
                    </div>
                );

            })}


            <CommentForm handleSubmit={props.handleSubmit} />


        </React.Fragment>

    );
}

export default withRouter(CommnetList);