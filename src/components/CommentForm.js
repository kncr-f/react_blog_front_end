import React,{useState} from 'react';
const COMMENT_INITIAL_STATE = {
    display_name:'',
    body:'' 
};  
 
const CommentForm = (props)=>{
   
 
    const [comment, setComment]=useState(COMMENT_INITIAL_STATE);

    const handleOnChange=(e)=>{
        setComment({...comment, [e.target.name]:e.target.value});
    };


    
    return (
    <React.Fragment>
        <h3>Write Comment</h3>
        <form className="ui form" onSubmit={(e)=>{
            e.preventDefault();
            props.handleSubmit(e,comment)
            setComment(COMMENT_INITIAL_STATE)
        }}>
            <div className="ui small icon input">
                <input 
                    name='display_name'
                    type="text" 
                    placeholder="Write your name please!" 
                    onChange={handleOnChange } 
                    value={comment.display_name}/>
             </div>
             <textarea 
                    name='body'
                    placeholder="Tell us more" 
                    rows="3" 
                    onChange={handleOnChange} 
                    value={comment.body}>
            </textarea>
            <button className="ui blue button" type='submit'>Send</button>
            
        </form>
        
    </React.Fragment>);

}

export default CommentForm;