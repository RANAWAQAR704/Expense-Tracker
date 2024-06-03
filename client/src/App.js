// Example: src/App.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import './App.css';

const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
