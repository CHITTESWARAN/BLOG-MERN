import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
       
   <main className='p-2.5 max-w-[90%] m-auto'> 
   <Header/>
   <Outlet/>
   </main> 
    </div>
  )
}

export default Layout