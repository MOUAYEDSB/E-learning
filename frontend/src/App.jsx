import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react'
import { useState } from 'react'
import Login from './pages/LoginForm/Login'
import {Sidebar} from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import {CreateUser} from './pages/CreateUser/CreateUser';
import {Dashboard} from './pages/Dashboard/Dashboard';
import { UsersList } from './pages/UsersList/UsersList';
import { GroupList } from './pages/GroupList/GroupList';
import { GroupInfo } from './pages/GroupInfo/GroupInfo';
import { AddGroup } from './pages/CreateGroup/CreateGroup';
import { UserProfile } from './pages/UserProfile/UserProfile';
export default function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [login, setLogin] = useState(false);

  return (
    <>
    {!login?
    <div className="app">
    <Sidebar />
      <div className='main-wrapper'>
        <Navbar />
        <div className='content-wrapper'>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<CreateUser/>} />
            <Route path="/user/list/seeds" element={<UsersList role={"seed"} />} />
            <Route path="/user/list/parents" element={<UsersList role={"parent"} />} />
            <Route path="/user/list/mentors" element={<UsersList role={"mentor"} />} />
            <Route path="/user/:id" element={<UserProfile/>} />
            <Route path="/group-list" element={<GroupList/>} />
            <Route path="/group-info" element={<GroupInfo/>}/>
            <Route path="/add-group" element={<AddGroup  />} />
            <Route path="/messages" element={<>tst</>} />
            <Route path="/settings" element={<>parametre</>} />
          </Routes>
        </div>
      </div>
    </div>:<Login />
    }
    </>
  );
}