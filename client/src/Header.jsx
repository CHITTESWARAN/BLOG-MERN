import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './Usercontext'; // Ensure correct export/import from Usercontext

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/profile', { withCredentials: true });
        setUserInfo(response.data);  // Ensure you're setting the response data
      } catch (error) {
        console.error('Error fetching profile:', error.message);
      }
    };

    fetchProfile();
  }, [setUserInfo]);  // Dependency array includes setUserInfo

  function logout() {
    axios.post('http://localhost:4000/logout', {}, { withCredentials: true })
      .then(() => {
        setUserInfo(null);  // Clear user info on logout
      })
      .catch((err) => console.error('Logout error:', err.message));
  }

  const username = userInfo?.username;

  return (
    <header className="flex mt-5 justify-between items-center">
      <Link to="/" className="logo text-2xl font-bold">MyBlog</Link>
      <nav className="flex gap-5">
        {username ? (
          <>
            <Link to="/create">Create new post</Link>
            <a href="#" onClick={logout}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
