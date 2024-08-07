import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react'
import { useState } from 'react'
import Login from './pages/LoginForm/Login'
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import ParentProfile from './pages/userProfile/parentProfile';
import CreateUser from './pages/createUser/createUser';
import Dashboard from './pages/Dashboard/Dashboard';
import UsersList from './pages/UsersList/UsersList';
import GroupList from './pages/GroupList/GroupList';
import AddGroup from './pages/AddGroup/AddGroup';
function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [login, setLogin] = useState(false);

  return (
    <>
    {login?
    <div className="app">
    <Sidebar />
    <div className='app-main'>
      <Navbar />
      <div className="container">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<CreateUser />} />
        <Route path="/users/enfant" element={<UsersList role={"enfant"} />} />
        <Route path="/users/parent" element={<UsersList role={"parent"} />} />
        <Route path="/users/formateur" element={<UsersList role={"formateur"} />} />
        <Route path="/message" element={<>tst</>} />
        <Route path="/groupe" element={<GroupList />} />
        <Route path="/userprofile/:id" element={<ParentProfile />} />
        <Route path="/add-group" element={<AddGroup  />} />
        <Route path="/parametre" element={<>parametre</>} />
        <Route path="/profile" element={<ParentProfile />} />
      </Routes>
      </div>
    </div>
    </div>:<Login />
    }
    </>
  );
}

export default App
