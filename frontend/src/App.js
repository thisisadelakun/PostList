import React from 'react';

import 'semantic-ui-css/semantic.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import {history} from './helpers';
import Layout from './containers/Layout';
import PostList from './containers/PostList';
import PostCreate from './containers/PostCreate';
import PostDetail from './containers/PostDetail';
import PostUpdate from './containers/PostUpdate';


function App() {
  return (
    <div className=''>
        <BrowserRouter history={history}>
          <Layout>
            <Routes>
              <Route index element={<PostList/>}/>
              <Route path = '/create' element={<PostCreate/>}/>
              <Route path = '/posts/:postSlug'  index element={<PostDetail/>}/>
              <Route path = '/posts/:postSlug/update'  index element={<PostUpdate/>}/>
            </Routes>
          </Layout>
       
        </BrowserRouter>
        
    </div>
  );
}

export default App;
