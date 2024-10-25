import React, { useState, useEffect, useContext } from 'react';
import { useParams,Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formatISO9075 } from 'date-fns';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { UserContext } from './Usercontext';

const Postpage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  const navigate=useNavigate();
  const {userInfo}=useContext(UserContext) 
  // Fetch post data by ID
  useEffect(() => {
    axios.get(`http://localhost:4000/post/${id}`, { withCredentials: true })
      .then((response) => {
        setPostInfo(response.data);
      })
      .catch((err) => {
       
        navigate("/login");
      });
  }, [id]);
  
  function thehandlepost()
  {
     axios.delete(`http://localhost:4000/post/${id}`,{withCredentials:true})
     .then((response)=>{
     alert("post a Deleted successfully")
      navigate("/")
     })
     .catch((err)=>console.log(err.message));

  }

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
      {userInfo.id===postInfo.author._id &&(
       <div className="flex justify-center gap-5 m-5 ml-72">
       <Link to={`/edit/${postInfo._id}`}>
         <button className='flex gap-3 justify-center items-center text-white bg-gray-700 hover:bg-green-700 text-xl px-6 py-2 rounded-md'>
           <FaRegEdit /> Edit
         </button> 
       </Link>
       
       <button 
         className='flex gap-3 justify-center items-center text-white bg-gray-700 hover:bg-red-500 text-xl px-6 py-2 rounded-md' 
         onClick={thehandlepost}>
         <MdDelete /> Delete 
       </button>
     </div>
     
      )}


        <div className='font-bold m-0 mt-2 text-3xl m-2 text-left'>
         <h1>{postInfo.title}</h1> 
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
