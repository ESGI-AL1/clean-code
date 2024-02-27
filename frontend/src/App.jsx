import './App.css'
import React from 'react';
import { useEffect, useState } from "react";

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import CardsPage from './pages/CardsPage'
import QuizzPage from './pages/QuizzPage'
import LoginFormPage from './pages/LoginFormPage'
import ResgisterFormPage from './pages/RegisterFormPage';
import CardsFormPage from './pages/CardsFormPage'
import CardsAnswerPage from './pages/CardsAnswerPage'
import Navigation from './components/Navigation'
import { Toaster } from 'react-hot-toast'
import { jwtDecode } from "jwt-decode";



const PrivateRoute = ({ Component }) => {
  const token = localStorage.getItem('token');
    let isAuthenticated = false;
    if (!token) {
      return <Navigate to="/login" />;
    }
    const decodedToken = jwtDecode(token);
    let currentDate = new Date();

    console.log('tokens', decodedToken)
    
    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      isAuthenticated = false;
    } else {
      isAuthenticated = true;
    }
    
    return isAuthenticated ? <Component /> : <Navigate to="/login" />;
  };


function App() {
  

  return (
    <BrowserRouter>
      <div className='container max-w-4xl mx-auto'>
        <Navigation/>
        <Routes>
          <Route path='/' element={<Navigate to='/cards'/>}/>
          <Route path='/cards' element={<PrivateRoute Component={CardsPage} />} />
          <Route path='/quizz' element={<PrivateRoute Component={QuizzPage} />} />
          <Route path='/cards-create' element={<PrivateRoute Component={CardsFormPage} />}/>
          <Route path='/cards/:id' element={<PrivateRoute Component={CardsAnswerPage} />} />
          <Route path='/login/' element={<LoginFormPage />} />
          <Route path='/register/' element={<ResgisterFormPage/>}/>
        </Routes>
        <Toaster position="bottom-right" reverseOrder={false}/>
      </div>
    </BrowserRouter>
  )
}

export default App