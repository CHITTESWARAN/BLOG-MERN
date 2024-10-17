import React, { useState } from 'react';
import axios from "axios";

const Registerpage = () => {
    const[username,setusername]=useState("");
    const[password,setpassword]=useState("");
    function handleRegisterpage(e)
    { e.preventDefault();
        axios.post("http://localhost:4000/register",{username,password})
        .then((result)=>(alert("Registeration Successful")))
        .catch((err)=>(alert("Registeration failed")))
        setusername("");
        setpassword("");
      
    }
  return (
    <form  className='max-w-[65%] mx-auto mt-32' onSubmit={handleRegisterpage}>
        <h1 className='w-full text-center my-12 text-3xl font-bold'>Register</h1>
      <input
        type="text"
        value={username}
        onChange={(e)=>(setusername(e.target.value))}
        placeholder="Username"
        className="block mb-5 w-full py-1.5 px-2 border-2 border-solid border-gray-300 rounded-md bg-white"
      />
      <input
        type="password"
        value={password}
        onChange={(e)=>(setpassword(e.target.value))}
        placeholder="Password"
        className="block mb-5 w-full py-1.5 px-2 border-2 border-solid border-gray-300 rounded-md bg-white"
      />
      <button type='submit' className='block w-full bg-gray-700 text-white rounded-md py-2'>
        Register
      </button>
    </form>
  );
};

export default Registerpage;
