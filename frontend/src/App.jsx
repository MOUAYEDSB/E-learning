import {Login} from "./pages/LoginForm/Login"
import {UsersList} from "./pages/UsersList/UsersList"
import {GroupList} from "./pages/GroupList/GroupList"
import {GroupInfo} from "./pages/GroupInfo/GroupInfo"
import {AddGroup} from "./pages/AddGroup/AddGroup"
import {Messages} from "./pages/Messages/Messages"
import {SideBar} from "./components/SideBar/SideBar"
import {NavBar} from "./components/NavBar/NavBar"
import React, { useState } from "react";
import {Routes, Route} from 'react-router-dom'
import "./App.css"

export default function App() {
  const [selectedContent, setSelectedContent] = useState(0);
  
  return (
    <>
      <NavBar/>
      <div className="main-wrapper">
        <SideBar /*setSelectedContent = {this.setSelectedContent}*/></SideBar>
        <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/users" element={<UsersList/>}>
          <Route path=":type" element={<UsersList/>}/>
        </Route>
        <Route path="/group-list" element={<GroupList/>}/>
        <Route path="/group-info" element={<GroupInfo/>}/>
        <Route path="/add-group" element={<AddGroup/>}/>
        <Route path="/messages" element={<Messages/>}/>
      </Routes>
      </div>
      
    </>
  )
}
