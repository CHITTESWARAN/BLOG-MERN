import React from 'react';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Indexpage from './Pages/Indexpage';
import LoginPage from './Pages/LoginPage';
import Registerpage from './Pages/Registerpage';
import Usercontext from "./Usercontext";
import Createpost from './Pages/Createpost';
import Postpage from './Postpage';

const App = () => {
  return (
    <Usercontext>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Indexpage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<Registerpage />} />
          <Route path="/create" element={<Createpost/>}/>
          <Route path="post/:id" element={<Postpage/>}/>
        </Route>
      </Routes>
    </Usercontext>
  );
};

export default App;
