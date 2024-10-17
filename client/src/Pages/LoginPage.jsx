import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Usercontext';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  function handleLogin(e) {
    e.preventDefault();
    axios.post("http://localhost:4000/login", { username, password },
      {
        withCredentials: true, // Ensure this is set to true to handle cookies
      }
    )
      .then((respond) => {
         setUserInfo(respond.data)
        setRedirect(true);  // Redirect to home after successful login
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  if (redirect ) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <form className='max-w-[65%] mx-auto mt-32' onSubmit={handleLogin}>
        <h1 className='w-full text-center my-12 text-3xl font-bold'>Login</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="block mb-5 w-full py-1.5 px-2 border-2 border-solid border-gray-300 rounded-md bg-white"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="block mb-5 w-full py-1.5 px-2 border-2 border-solid border-gray-300 rounded-md bg-white"
        />
        <button className='block w-full bg-gray-700 text-white rounded-md py-2' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
