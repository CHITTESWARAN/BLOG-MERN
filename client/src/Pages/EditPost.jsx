import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Editor from '../Editor';

const EditPost = () => {
  const { id } = useParams(); 
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:4000/post/${id}`, { withCredentials: true })
      .then((response) => {
        let postInfo = response.data;
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
        // Don't set the file input value programmatically
        setFiles(postInfo.cover); // This can be used to display the cover, but not set file input
      })
      .catch((err) => {
        console.log('Page not found', err);
      });
  }, [id]);

  async function updatePost(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('content', content);
    formData.append('id',id);
    if (files && files[0]) {
      formData.append('file', files[0]); // Handle file upload if a new file is selected
    }
    
    try {
      await axios.put(`http://localhost:4000/post/${id}`, formData, { withCredentials: true });
      alert("The data has been updated");
      setRedirect(true);
    } catch (err) {
      console.error(err);
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <form className="flex flex-col gap-6 w-[90%] max-w-3xl border border-gray-300 p-6 font-serif m-auto mt-8" onSubmit={updatePost}>
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
        onChange={(e) => setFiles(e.target.files)}  // Capture file selection
        className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
      />

      <Editor onChange={setContent} value={content} />

      <button className="p-4 w-[28%] m-auto bg-blue-600 border border-black-800 text-white font-xl rounded-xl">
        Update Post
      </button>
    </form>
  );
};

export default EditPost;
