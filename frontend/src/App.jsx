import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/LoginForm/Login";
import { Sidebar } from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import { CreateUser } from "./pages/CreateUser/CreateUser";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { UsersList } from "./pages/UsersList/UsersList";
import { GroupList } from "./pages/GroupList/GroupList";
import { GroupInfo } from "./pages/GroupInfo/GroupInfo";
import { UserProfile } from "./pages/UserProfile/UserProfile";
import CreateGroup from "./pages/CreateGroup/CreateGroup";
import { ContactList } from "./pages/ContactList/ContactList";
import { SidebarKids } from "./components/SideBarKids/SidebarKids";
import NavbarKids from "./components/NavBarKids/NavbarKids";
import { DashboardKids } from "./pages/KidsDashboard/KidsDashboard";
import { DashboardParents } from "./pages/ParentsDashboard/ParentsDashboard";
import { SidebarParents } from "./components/SideBarParents/SideBarParents";
import NavbarParents from './components/NavBarParents/NavBarParents';

export default function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")?.toLowerCase(); // Ensure consistent case
  const [login, setLogin] = useState(false);

  useEffect(() => {
    setLogin(!!token);
  }, [token]);

  return (
    <Routes>
      {login && role === "admin" ? (
        <>
          {/* Separate Admin Dashboard Route */}
          <Route path="/" element={<Navigate to="/dashboard/admin" />} />
          <Route
            path="/dashboard/admin"
            element={
              <>
                <Sidebar />
                <div className="main-wrapper">
                  <Navbar role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <Dashboard />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/create-user"
            element={
              <>
                <Sidebar />
                <div className="main-wrapper">
                  <Navbar role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <CreateUser />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/user/list/seeds"
            element={
              <>
                <Sidebar />
                <div className="main-wrapper">
                  <Navbar role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <UsersList role={"enfant"} />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/user/list/parents"
            element={
              <>
                <Sidebar />
                <div className="main-wrapper">
                  <Navbar role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <UsersList role={"parent"} />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/user/list/mentors"
            element={
              <>
                <Sidebar />
                <div className="main-wrapper">
                  <Navbar role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <UsersList role={"formateur"} />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/user/create"
            element={
              <>
                <Sidebar />
                <div className="main-wrapper">
                  <Navbar role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <CreateUser />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/user/:id"
            element={
              <>
                <Sidebar />
                <div className="main-wrapper">
                  <Navbar role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <UserProfile />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/group-list"
            element={
              <>
                <Sidebar />
                <div className="main-wrapper">
                  <Navbar role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <GroupList />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/group-info/:id"
            element={
              <>
                <Sidebar />
                <div className="main-wrapper">
                  <Navbar role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <GroupInfo />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/add-group"
            element={
              <>
                <Sidebar />
                <div className="main-wrapper">
                  <Navbar role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <CreateGroup />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/messages"
            element={
              <>
                <Sidebar />
                <div className="main-wrapper">
                  <Navbar role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <>Messages Page</>
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <Sidebar />
                <div className="main-wrapper">
                  <Navbar role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <>Settings Page</>
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Sidebar />
                <div className="main-wrapper">
                  <Navbar role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <ContactList />
                  </div>
                </div>
              </>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard/admin" />} />
        </>
      ) : login && role === "enfant" ? (
        <>
          {/* Separate Kids Dashboard Route */}
          <Route path="/" element={<Navigate to="/dashboard/kids" />} />
          <Route
            path="/dashboard/kids"
            element={
              <>
                <SidebarKids />
                <div className="main-wrapper">
                  <NavbarKids role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <DashboardKids />
                  </div>
                </div>
              </>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard/kids" />} />
        </>
      ) : login && role === "parent" ? (
        <>
          {/* Parent Routes */}
          <Route path="/" element={<Navigate to="/dashboard/parent" />} />
          <Route
            path="/dashboard/parent"
            element={
              <>
                {/* Add Sidebar and Navbar for parents, if needed */}
                <SidebarParents />
                <div className="main-wrapper">
                  <NavbarParents role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <DashboardParents />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/parent/profile"
            element={
              <>
                <SidebarParents />
                <div className="main-wrapper">
                  <NavbarParents role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <DashboardParents />
                  </div>
                </div>
              </>
            }
          />
          {/* Add other parent-specific routes as needed */}
          <Route path="*" element={<Navigate to="/dashboard/parent" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login setLogin={setLogin} />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}
