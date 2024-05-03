/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PlayPage from "./pages/playPage";
import ProfilePage from "./pages/profilePage";
import ShopPage from "./pages/shopPage";
import AuthPage from "./pages/authPage";
import './App.css';
import React from 'react';
import QuizPage from './pages/quizPage';

function App() {
  const token = sessionStorage.getItem('access_token');

  return (
    <Router  basename="/auth" >
      <main>
        <Routes>
          {token ? (
            <>
              <Route path="/" element={<Navigate to="/play" />} />
              <Route path="/play" element={<PlayPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/quiz" element={<QuizPage />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/auth" />} />
              <Route path="/play" element={<Navigate to="/auth" />} />
              <Route path="/shop" element={<Navigate to="/auth" />} />
              <Route path="/profile" element={<Navigate to="/auth" />} />
              <Route path="/quiz" element={<Navigate to="/auth" />} />
              <Route path="/auth" element={<AuthPage />} />
            </>
          )}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
