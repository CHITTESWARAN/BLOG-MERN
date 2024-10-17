import React, { useEffect, useState } from 'react'
import axios from "axios"
import Post from '../Post'

const Indexpage = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/post")
      .then((response) => {
        console.log(response.data)
        setPosts(response.data)
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div>
      {
        posts ? (
          posts.map((post, index) => (
  
            <Post key={index} {...post} /> 
          ))
        ) : (
          <h3>No posts available. Create a post.</h3>
        )
      }
    </div>
  );
}

export default Indexpage;
