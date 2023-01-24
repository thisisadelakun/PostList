// import axios from 'axios';
// import React,{useRef, useState} from 'react'
// // import {Header} from 'semantic-ui-css'
// import { Button, Form } from 'semantic-ui-react'
// import Message from '../components/Message'
// import {history} from '../helpers'
// import { api } from '../api';

// const PostCreate = () => {
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [title, setTitle] = useState(null);
//   const [markdown, setMarkdown] = useState(null);
//   const [thumbnail, setThumbnail] = useState(null);

//   const fileInputRef = useRef()

//   function handleSubmit(e){
//     e.preventDefault();
//     setLoading(true);
   
//     const formData = new FormData()
//     formData.append("thumbnail", thumbnail)
//     formData.append("title", title)
//     formData.append("content", markdown)

//     axios.post(api.posts.create, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         "Authorization": "Token bdf67d8cab9ef761ac650af230631cdb7de155eb"
        
//       }
//     })
//     .then(res =>{
//       console.log(res)
//       setLoading(false);
//       history.push('/')
//     })
//     .catch(err => {
//       setLoading(false);
//       console.log(err)
//       setError(err.message || err)
//   })}
//   return (
//     <div>
//         <h1>Create a post</h1>
//         {error && (
//           <Message danger message={error}/>
//         )}
//         {thumbnail && <Message info message={`Selected image: ${thumbnail.name}`} />} 
//         {/* alternatively, */}
//         {/* {thumbnail && <input value={thumbnail.name} disabled/>} */}
//         <Form>
//           <Form.Field>
//             <label>Title</label>
//             <input placeholder='Title of your post'
//             value={title}
//             onChange={e => setTitle(e.target.value)} />
//           </Form.Field>
//           <Form.TextArea
//            label='Markdown Content'
//            placeholder='This is your post content'
//            value={markdown}
//            onChange={e => setMarkdown(e.target.value)}  />
//           <Form.Field>
            
             
//             <Button 
//              type='button'
//              content="Chose a thumbnail"
//              labelPosition='left'
//              icon='file'
//              onClick={() => fileInputRef.current.click()}
//              />
//              <input ref={fileInputRef} type="file" hidden
//               onChange={e => setThumbnail(e.target.files[0])}/>
//           </Form.Field>
//           <Button primary fluid type='submit' onClick={handleSubmit}>Submit</Button>
//         </Form>
//     </div>
    
//   )
// }

// export default PostCreate
















import React, {useRef, useState } from 'react'
import {Header, Button, Checkbox, Form } from 'semantic-ui-react'
import Message from '../components/Message';
import axios from 'axios';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import {history} from '../helpers';
import {api} from "../api"


const PostCreate = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(null);
  const [markdown, setMarkdown] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const fileInputRef = useRef()

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    console.log(markdown)
    const formData = new FormData()
    formData.append("thumbnail", thumbnail)
    formData.append("title", title)
    formData.append("content", markdown)
    
    axios
      .post(api.posts.create, formData, {
      headers:{
        "Content-Type": "multipart/form-data",
        "Authorization": "Token bdf67d8cab9ef761ac650af230631cdb7de155eb"
      }
    })
    .then(res => {
      setLoading(false);
      history.push('/')
      //if this is a successfull response we ,redirect back to PostList
    })
    .catch(err => {
      setLoading(false);
      setError(err.message || err)
    })
  }
  return (
    <div>
     <h1>Create a post</h1>
     {error && (
      <Message danger message={error}/>
     )}
     {thumbnail && <Message info message={`Selected image: ${thumbnail.name}`} />}
     {/* {thumbnail && <input value={thumbnail.name} disabled/>} */}
      <Form >
        <Form.Field>
          <label>Title</label>
          <input placeholder='Title of your post'
           value={title} 
           onChange={e => setTitle(e.target.value)} />
        </Form.Field>
         
        <MdEditor 
          style={{ height: '500px' }}
          renderHTML={text => mdParser.render(text)} 
          onChange={({text}) => setMarkdown(text)} 
        />   
        <Form.Field>
          {/* {thumbnail && <input value={thumbnail.name} disabled/>} */}
          <Button
            type='button'
           fluid
           content="Choose a thumbnail"
           labelPosition='left' 
           icon="file"
           onClick={() => fileInputRef.current.click()}
          />
          <input ref={fileInputRef}
           type="file" 
           hidden
           onChange={e => setThumbnail(e.target.files[0])
           }/>
        </Form.Field>
        <Button loading={loading} disabled={loading} primary fluid type='submit' onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
    
  )
}

export default PostCreate