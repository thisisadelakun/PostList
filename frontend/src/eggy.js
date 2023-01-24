import React from 'react'
import 'eggy.css'

import BlogList from './containers/PostList'
import About from './containers/About'
import Contact from './containers/Contact'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
function eggy(){
  return (
    <div className='eggy'>
        <BrowserRouter>
        <Routes>
            <Route index element={<BlogList/>}/>
            <Route path = 'About' element={<About/>}/>
            <Route path = 'Contact'  index element={<Contact/>}/>
        </Routes>
        </BrowserRouter>
        
    </div>
  )
}

export default eggy

//use App anywhere you see eggy