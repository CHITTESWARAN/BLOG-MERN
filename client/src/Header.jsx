import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './Usercontext'; 
const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate=useNavigate()
   
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/profile', { withCredentials: true });
        setUserInfo(response.data);  
      } catch (error) {
        console.error('Error fetching profile:', error.message);
      }
    };

    fetchProfile();
  }, [setUserInfo]); 

  function logout() {
    axios.post('http://localhost:4000/logout', {}, { withCredentials: true })
      .then(() => {
        setUserInfo(null);  // Clear user info on logout
        navigate('/login')
      })
      .catch((err) => console.error('Logout error:', err.message));
  }

  const username = userInfo?.username;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-white text-[#333] shadow-md rounded-md">
      <Link to="/" className="logo text-2xl font-bold">MyBlog</Link>
      <nav className="flex gap-1">
        {username ? (
          <>
            <Link to="/create" className='text-sm border py-2 px-4 m-3 rounded-md text-white bg-gray-700 hover:bg-gray-800 '>Create new post</Link>
            <Link to="#" onClick={logout} className='text-sm py-2 px-4 m-3 border rounded-md text-white bg-gray-700 hover:bg-gray-800'>Logout</Link>
            <div className='flex justify-center items-center font-semibold text-[18px]'><h2>Hi {userInfo.username}</h2></div>
            
          </>
        ) : (
          <>
            <Link to="/login" className='text-sm py-2 px-4 border rounded-md text-white bg-gray-700 hover:bg-gray-800'>Login</Link>
            <Link to="/register" className="text-sm py-2 px-4 border rounded-md text-white bg-gray-700 hover:bg-gray-800">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
