import React from 'react';
import PostList from './components/PostList';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PostDetail from './components/PostDetail';
import AddPost from './components/AddPost';
import EditPost from './components/EditPost';
import EditComment from './components/EditComment';


function App() {
  return (
    <Router>
      <div className='main-wrapper'>
        <header></header>
        <div className="ui raised very padded text container segment">
          <Route path='/' exact component={PostList}/>
          <Route path='/posts/:id' exact component={PostDetail}/>
          <Route path='/addpost' exact component={AddPost}/>
          <Route path='/posts/:id/edit' exact component={EditPost}/>
          <Route path='/posts/:post_id/comments/:id/edit' exact component={EditComment}/>
          
        </div>
      </div>
    </Router>

  );
}

export default App;
