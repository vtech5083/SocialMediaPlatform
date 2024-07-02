// src/App.js
import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import NavbarWrapper from './components/NavbarWrapper'
import Dashboard from './components/Dashboard'
import Friends from './components/Friends'
import UserManagement from './components/UserManagement'
import FriendRequests from './components/FriendRequests'
import Signup from './components/Signup';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <Router>
      <AuthProvider >
        <NavbarWrapper />
        <Routes>
          <Route path="/" element={<PrivateRoute element={Dashboard} />} />
          <Route path='/friends' element={<PrivateRoute element={Friends} />} />
          <Route path='/profile' element={<PrivateRoute element={UserManagement} />} />
          <Route path='/requests' element={<PrivateRoute element={FriendRequests} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>

    </Router >
  )
}

export default App
