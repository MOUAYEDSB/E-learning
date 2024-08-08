import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react'
import { useState } from 'react'
import Login from './pages/LoginForm/Login'
import {Sidebar} from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import ParentProfile from './pages/userProfile/parentProfile';
import CreateUser from './pages/createUser/createUser';
import Dashboard from './pages/Dashboard/Dashboard';
import {UsersList} from './pages/UsersList/UsersList';
import {GroupList} from './pages/GroupList/GroupList';
import {GroupInfo} from "./pages/GroupInfo/GroupInfo"
import {AddGroup} from './pages/AddGroup/AddGroup';
function App() {
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
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<CreateUser />} />
          <Route path="/users/seeds" element={<UsersList role={"seed"} />} />
          <Route path="/users/parents" element={<UsersList role={"parent"} />} />
          <Route path="/users/mentors" element={<UsersList role={"mentor"} />} />
          <Route path="/group-list" element={<GroupList/>} />
          <Route path="/group-info" element={<GroupInfo/>}/>
          <Route path="/add-group" element={<AddGroup  />} />
          <Route path="/messages" element={<>tst</>} />
          <Route path="/settings" element={<>parametre</>} />
          <Route path="/userprofile/:id" element={<ParentProfile />} />
          <Route path="/profile" element={<ParentProfile />} />
        </Routes>
      </div>
    </div>:<Login />
    }
    </>
  );
}

export default App
