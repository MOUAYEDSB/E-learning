import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react'
import Login from './pages/LoginForm/Login'


function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const renderDashboard = () => {
    switch (role) {
      case 'admin':
        return <></>;
      case 'teacher':
        return <></>;
      case 'parent':
        return <></>;
      case 'kid':
        return <></>;
      default:
        return <Login />;
    }
  };

  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        {token ? (
          <>
            <Route path="/dashboard" element={renderDashboard()} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
  );
}

export default App
