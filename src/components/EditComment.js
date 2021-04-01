import React,{useEffect,useState} from 'react';
//import { api } from '../api';
import { withRouter } from "react-router-dom";
import { api } from '../api';

const EditComment = (props) => {
//const {comments}=
  
    const [comment, setComment]=useState({display_name:"",body:""});
    //const { id } = props.match.params;

    //const comments=[props.comments];
    //console.log('editcommnet :',props);

    const onInputChange = (e) => {
        setComment({ ...comment, [e.target.name]: e.target.value })
    }

  

    useEffect(()=>{
        api()
        .get(`posts/${props.match.params.post_id}/comments`)
        .then(response=>{
            console.log('getresponsdata:',response.data);

            const myComment = response.data.filter(item=> item.id == props.match.params.id );
            console.log('myCommnet:',myComment);

            setComment({display_name:myComment[0].display_name,body:myComment[0].body})

            console.log(props.match.params.id );
        })
    },[])

    const handleFormSubmit=(e)=>{
        e.preventDefault();
        api().put(`posts/${props.match.params.post_id}/comments/${props.match.params.id}`,comment)
        .then(response=>{
            console.log('putresponsedata:',response.data);
            props.history.push(`/posts/${props.match.params.post_id}`);
        })
    }

    // useEffect(()=>{

    //     api()
    //     .put(`/posts/${props.match.params.post_id}/comments/${props.match.params.id}`,)
    //     .then(response=>{
    // console.log(response.data);

    // // // //     });
    //  },[])
    
{/*<Route exact path="/post/:id" render={({match}) => (<Post post={posts.find(p => p.id === match.params.id)} />)} />*/}

    return (
        <React.Fragment>
            <h2> Comment Edit Form </h2>
            <div className="ui form">
                <div className="field">
                    <label>Name </label>
                    <input
                        name="display_name"
                        value={comment.display_name}
                        type="text"
                        onChange={onInputChange}
                        

                    />
                </div>
                <div className="field">
                    <label>Comment Content</label>
                    <textarea
                        name="body"
                        value={comment.body}
                        rows="3"
                        onChange={onInputChange}
                        

                    ></textarea>
                </div>
                <button onClick={handleFormSubmit} className="ui primary button">
                    Send
                </button>
                <button onClick={()=>{
                    props.history.push(`/posts/${props.match.params.post_id}`);
                }} className="ui button">
                    Cancel
                </button>
            </div>
        </React.Fragment>

    )
}

export default withRouter(EditComment);