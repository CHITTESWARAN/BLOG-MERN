import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { formatISO9075 } from 'date-fns';

const Postpage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();

  // Fetch post data by ID
  useEffect(() => {
    axios
      .get(`http://localhost:4000/post/${id}`, { withCredentials: true })
      .then((response) => {
        setPostInfo(response.data);
      })
      .catch((err) => {
        console.log('Page not found', err);
      });
  }, [id]);

  // Convert absolute image path to relative path
  const convertToRelativePath = (path) => {
    return path
      .replace(/\\/g, '/')
      .replace('C:/Users/chitteswaran/OneDrive/Desktop/PORTFOLIO-REACT/BLOGWEBSITE-MERN/api/uploads/', '/uploads/');
  };

  // Ensure postInfo is loaded before accessing properties
  if (!postInfo) {
    return <div>Loading...</div>; // Display loading state while data is being fetched
  }

  const coverImage = convertToRelativePath(postInfo.cover);

  return (
    <div className="w-full text-center my-8">
      <h1 className="text-3xl font-bold mb-4">{postInfo.title}</h1>
      
      <time className="block text-sm text-gray-500 mb-2">
        {formatISO9075(new Date(postInfo.createdAt))}
      </time>

      <div className="mb-4 text-sm font-bold text-gray-600">
        by @{postInfo.author.username}
      </div>

      <div className="flex justify-center items-center w-full h-[400px] overflow-hidden mb-5">
        <img
          src={`http://localhost:4000${coverImage}`}
          alt="Cover image not found"
          className="w-auto  h-full object-cover object-center"
        />
      </div>

      <div
        className="text-lg text-justify leading-relaxed px-4 md:px-8 tx-md"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
};

export default Postpage;
