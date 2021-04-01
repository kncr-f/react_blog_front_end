import React,{useState} from 'react';
import { Button,  Modal } from 'semantic-ui-react';
import { api } from '../api';

const DeleteModal=({post,push})=>{

    const [open, setOpen]=useState(false);
    const [error, setError]=useState('');
    const show=()=>{setOpen(true)};
    const hide=()=>{setOpen(false)};

    const handleDelete=(id)=>{
        api().delete(`/posts/${id}`)
        .then(()=>{
            hide();
            push('/');
        })
        .catch(()=>{
            setError('Something went wrong with delete.')
        })
        
    }

  

    return(
        <React.Fragment>
                <Button onClick={show} color="red" >Delete</Button>
                <Modal
                size="mini"
                open={open}
                onClose={hide}
               
            >
                    <Modal.Header>Delete Your Post</Modal.Header>
                    <Modal.Content>
                    <p>Are you sure you want to delete <b>'<i>{post.title}</i>'?</b></p>
                    {error && <p>{error}</p>}
                    </Modal.Content>
                    <Modal.Actions>
                    <Button negative onClick={hide} >
                        No
                    </Button>
                    <Button positive  onClick={()=>handleDelete(post.id)} >
                        Yes
                    </Button>
                    </Modal.Actions>
            </Modal>

        </React.Fragment>
    );
};

export default DeleteModal;