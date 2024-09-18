import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Login from './pages/LoginForm/Login';
import { Sidebar } from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import { CreateUser } from './pages/CreateUser/CreateUser';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { UsersList } from './pages/UsersList/UsersList';
import { GroupList } from './pages/GroupList/GroupList';
import { GroupInfo } from './pages/GroupInfo/GroupInfo';
import { UserProfile } from './pages/UserProfile/UserProfile';
import CreateGroup from './pages/CreateGroup/CreateGroup';
import { ContactList } from './pages/ContactList/ContactList';

export default function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [token]);

  return (
    <Routes>
      {/* Routes for when user is logged in and has admin role */}
      {login && role === "admin" ? (
        <>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<>
            <Sidebar />
            <div className="main-wrapper">
              <Navbar role={role} setLogin={setLogin} />
              <div className="content-wrapper">
                <Dashboard />
              </div>
            </div>
          </>} />
          <Route path="/home" element={<>
            <Sidebar />
            <div className="main-wrapper">
              <Navbar role={role} setLogin={setLogin} />
              <div className="content-wrapper">
                <CreateUser />
              </div>
            </div>
          </>} />
          <Route path="/user/list/seeds" element={<>
            <Sidebar />
            <div className="main-wrapper">
              <Navbar role={role} setLogin={setLogin} />
              <div className="content-wrapper">
                <UsersList role={"enfant"} />
              </div>
            </div>
          </>} />
          <Route path="/user/list/parents" element={<>
            <Sidebar />
            <div className="main-wrapper">
              <Navbar role={role} setLogin={setLogin} />
              <div className="content-wrapper">
                <UsersList role={"parent"} />
              </div>
            </div>
          </>} />
          <Route path="/user/list/mentors" element={<>
            <Sidebar />
            <div className="main-wrapper">
              <Navbar role={role} setLogin={setLogin} />
              <div className="content-wrapper">
                <UsersList role={"formateur"} />
              </div>
            </div>
          </>} />
          <Route path="/user/create" element={<>
            <Sidebar />
            <div className="main-wrapper">
              <Navbar role={role} setLogin={setLogin} />
              <div className="content-wrapper">
                <CreateUser />
              </div>
            </div>
          </>} />
          <Route path="/user/:id" element={<>
            <Sidebar />
            <div className="main-wrapper">
              <Navbar role={role} setLogin={setLogin} />
              <div className="content-wrapper">
                <UserProfile />
              </div>
            </div>
          </>} />
          <Route path="/group-list" element={<>
            <Sidebar />
            <div className="main-wrapper">
              <Navbar role={role} setLogin={setLogin} />
              <div className="content-wrapper">
                <GroupList />
              </div>
            </div>
          </>} />
          <Route path="/group-info/:id" element={<>
            <Sidebar />
            <div className="main-wrapper">
              <Navbar role={role} setLogin={setLogin} />
              <div className="content-wrapper">
                <GroupInfo />
              </div>
            </div>
          </>} />
          <Route path="/add-group" element={<>
            <Sidebar />
            <div className="main-wrapper">
              <Navbar role={role} setLogin={setLogin} />
              <div className="content-wrapper">
                <CreateGroup />
              </div>
            </div>
          </>} />
          <Route path="/messages" element={<>
            <Sidebar />
            <div className="main-wrapper">
              <Navbar role={role} setLogin={setLogin} />
              <div className="content-wrapper">
                <>Messages Page</>
              </div>
            </div>
          </>} />
          <Route path="/settings" element={<>
            <Sidebar />
            <div className="main-wrapper">
              <Navbar role={role} setLogin={setLogin} />
              <div className="content-wrapper">
                <>Settings Page</>
              </div>
            </div>
          </>} />
          <Route path="/contact" element={<>
            <Sidebar />
            <div className="main-wrapper">
              <Navbar role={role} setLogin={setLogin} />
              <div className="content-wrapper">
                <ContactList />
              </div>
            </div>
          </>} />
          {/* Redirect to dashboard if route is not found */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login setLogin={setLogin} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}
