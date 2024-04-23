/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PlayPage from "./pages/playPage" 
import ProfilePage from "./pages/profilePage" 
import ShopPage from "./pages/shopPage"
import AuthPage from "./pages/authPage" 
import './App.css'
import React from 'react';
import QuizPage from './pages/quizPage'

function App() {
  const token = sessionStorage.getItem('access_token');

 

  return (
    <>
      <Router>
        <main>
          <Routes>
          {token ? (
  <>
 
    <Route path="/play" element={<PlayPage />} />
    <Route path="/shop" element={<ShopPage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/quiz" element={ < QuizPage />} />
  </>
) : (
  <Route path="/auth" element={<AuthPage />} />
)}

          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
