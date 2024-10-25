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
  

  if(!posts)
  {
   return(<h2>Loading...</h2>)
  }

  return (
    <div className='mt-32'>
      {
        posts.length!=0 ? (
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
