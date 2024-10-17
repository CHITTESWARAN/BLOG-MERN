import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'
export const UserContext=createContext({})

const Usercontext = ({children}) => {
    const[userInfo,setUserInfo]=useState({})
  return (
   <UserContext.Provider value={{userInfo,setUserInfo}}>
    {children}
   </UserContext.Provider>
  );
}

export default Usercontext