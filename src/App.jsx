import React, {useEffect, useState}from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { SignIn } from './layouts/sign-in'
import { Main } from './layouts/main';
import { Header } from './components/header'
import { Footer } from './components/footer';
import { ProtectedRoute } from './services/routes/protectedRoute';

import { logoutUserRequest, loginUserSuccess } from './store/actions/auth/auth.actions';

import { protectedRoutes } from './services/routes/constants';
import './App.css';

function App() {
  const reducerLoading = useSelector(state => state)
  const isAuth = useSelector(state => state.auth.authentificated);
  const dispatch = useDispatch();
  
  if(Object.keys(reducerLoading).some((key) => reducerLoading[key].loading)) document.body.style.overflow = 'hidden';
  else document.body.style.overflow = 'visible';

  useEffect(()=>{
    const token = localStorage.getItem('token')
    token ? dispatch(loginUserSuccess()) : dispatch(logoutUserRequest()) 
  },[])

  return (
    <Router>
        <Header/>
        <Routes>
            <Route path="main" element={<Main/>}/>
            <Route path="login" element={<SignIn/>}/>
            {protectedRoutes.map(({path, render}) => (
                <Route path={path} element={
                    <ProtectedRoute isAllowed={isAuth}>{render}</ProtectedRoute>
                }/>
            ))}
            <Route path="*" element={<div>not found</div>}/>
        </Routes>
        <Footer/>
    </Router>
  )
}

export default App;
