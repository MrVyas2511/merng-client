import React from 'react'
import {  BrowserRouter as Router,Routes, Route, Link } from "react-router-dom";
import { Container } from 'semantic-ui-react';

import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/authRoute';

import MenuBar from './components/Menubar'; 
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';

function App() {
  return (
    <AuthProvider>
    <Router>
    <div className='ui container'>
    <MenuBar/>
      <Routes>
            <Route exact path='/' element={<Home />} /> 
            <Route exact path = '/login' element={<AuthRoute/>}>
              <Route exact path='/login' element={<Login />} /> 
            </Route>
            <Route exact path = '/register' element={<AuthRoute/>}>
              <Route exact path='/register' element={<Register/>}/> 
            </Route>
            <Route exact path='/posts/:postId' element={<SinglePost/>}/>
      </Routes>
      </div> 
      </Router>
      </AuthProvider>
  );
}

export default App;
