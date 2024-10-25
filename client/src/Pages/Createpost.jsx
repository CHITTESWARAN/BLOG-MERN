import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import Editor from '../Editor';


const Createpost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);

  function createNewPost(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('content', content);
    if (files) {
      formData.append('file', files[0]);
    }

    axios.post('http://localhost:4000/post', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    })
      .then((response) => {
        alert('Post uploaded successfully');
        setRedirect(true);
      })
      .catch((err) => console.log(err.message));
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <form className="flex flex-col gap-6 w-[90%] max-w-3xl  border border-gray-300 p-6 font-serif m-auto mt-24" onSubmit={createNewPost}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        />

        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Summary"
          className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        />

        <input
          type="file"
          onChange={(e) => setFiles(e.target.files)}
          className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        />

      <Editor value={content} onChange={setContent}/>

        <button className="p-4 w-[28%] m-auto bg-blue-600 border border-black-800 text-white font-xl rounded-xl">
          Create post
        </button>
      </form>
    </>
  );
};

export default Createpost;
