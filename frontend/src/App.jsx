import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import Login from './pages/LoginForm/Login';
import { Sidebar } from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import MessagePage from './pages/messages/message';
import ParametresPage from './pages/Parametres/Parametres';
import { CreateUser } from './pages/createUser/createUser';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { UsersList } from './pages/UsersList/UsersList';
import { GroupList } from './pages/GroupList/GroupList';
import { GroupInfo } from './pages/GroupInfo/GroupInfo';
import { UserProfile } from './pages/userProfile/UserProfile';
import CreateGroup from './pages/CreateGroup/CreateGroup.jsx';
import HomePage from './pages/Home/home.jsx';

export default function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [login, setLogin] = useState(true);

  // Get the current location path
  const location = useLocation();

  // If the current path is '/welcome' or '/login', we might want to show only specific components
  const isWelcomePage = location.pathname === '/welcome';
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {login ? (
        <>
          {isWelcomePage ? (
            <HomePage />
          ) : isLoginPage ? (
            <Login />
          ) : (
            <div className="app">
              <Sidebar />
              <div className="main-wrapper">
                <Navbar />
                <div className="content-wrapper">
                  <Routes>
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/home" element={<CreateUser />} />
                    <Route path="/welcome" exact element={<HomePage />} />
                    <Route path="/user/list/allUsers" element={<UsersList />} />
                    <Route path="/user/list/seeds" element={<UsersList role={'enfant'} />} />
                    <Route path="/user/list/parents" element={<UsersList role={'parent'} />} />
                    <Route path="/user/list/mentors" element={<UsersList role={'formateur'} />} />
                    <Route path="/user/create" element={<CreateUser />} />
                    <Route path="/user/:id" element={<UserProfile />} />
                    <Route path="/group-list" element={<GroupList />} />
                    <Route path="/group-info/:id" element={<GroupInfo />} />
                    <Route path="/add-group" element={<CreateGroup />} />
                    <Route path="/messages" element={<MessagePage />} />
                    <Route path="/settings" element={<ParametresPage />} />
                  </Routes>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <Login setLogin={setLogin}/>
      )}
    </>
  );
}
