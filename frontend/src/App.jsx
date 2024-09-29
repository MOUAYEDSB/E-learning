import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/LoginForm/Login";
import { Sidebar } from "./components/Admin/Sidebar/Sidebar";
import Navbar from "./components/Admin/Navbar/Navbar";
import { CreateUser } from "./pages/CreateUser/createUser";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { UsersList } from "./pages/UsersList/UsersList";
import { GroupList } from "./pages/GroupList/GroupList";
import { GroupInfo } from "./pages/GroupInfo/GroupInfo";
import { UserProfile } from "./pages/UserProfile/UserProfile";
import CreateGroup from "./pages/CreateGroup/CreateGroup";
import { ContactList } from "./pages/ContactList/ContactList";
import { SidebarKids } from "./components/Enfant/SideBarKids/SidebarKids";
import NavbarKids from "./components/Enfant/NavBarKids/NavbarKids";
import { DashboardKids } from "./pages/KidsDashboard/KidsDashboard";
import { DashboardParents } from "./pages/ParentsDashboard/ParentsDashboard";
import { SidebarParents } from "./components/Parent/SideBarParents/SideBarParents";
import NavbarParents from "./components/Parent/NavBarParents/NavBarParents";
import { DashboardFormateur } from "./pages/FormateurDashboard/FormateurDashboard";
import { SideBarFormateur } from "./components/Formateur/SideBarFormateur/SideBarFormateur";
import NavbarFormateur from "./components/Formateur/NavBarFormateur/NavBarFormateur";
import Messages from "./pages/Message/Message";
import ParametresPage from "./pages/Parametres/Parametres";
import { Calendaruser } from "./pages/Calendaruser/Calendaruser";
import { KidProfile } from './pages/UserProfile/KidProfile';
import KidsProjects from './pages/Projects/KidsProjects';
import  {ListeAmis}  from "./pages/Calendaruser/Listeamis"


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
                    <Messages />
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
                    <ParametresPage />
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
          <Route
            path="/calendaruser"
            element={
              <>
                <Sidebar />
                <div className="main-wrapper">
                  <Navbar role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <Calendaruser />
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
          <Route
            path="/calendaruser"
            element={
              <>
                <SidebarKids />
                <div className="main-wrapper">
                  <NavbarKids role={role} setLogin={setLogin} />
                  <div className="content-wrapper centered-content">
                    <Calendaruser />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/messages"
            element={
              <>
                <SidebarKids />
                <div className="main-wrapper">
                  <NavbarKids role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <Messages />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <SidebarKids />
                <div className="main-wrapper">
                  <NavbarKids role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <ParametresPage />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/project"
            element={
              <>
                <SidebarKids />
                <div className="main-wrapper">
                  <NavbarKids role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <KidsProjects />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/amis"
            element={
              <>
                <SidebarKids />
                <div className="main-wrapper">
                  <NavbarKids role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <ListeAmis />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/enfant/:id"
            element={
              <>
                <SidebarKids />
                <div className="main-wrapper">
                  <NavbarKids role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <KidProfile />
                  </div>
                </div>
              </>
            }
          />
          <Route path="*" element={<Navigate to="/calendaruser" />} />
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
      ) : login && role === "formateur" ? (
        <>
          {/* Formateur Routes */}
          <Route path="/" element={<Navigate to="/dashboard/formateur" />} />
          <Route
            path="/dashboard/formateur"
            element={
              <>
                <SideBarFormateur />
                <div className="main-wrapper">
                  <NavbarFormateur role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <DashboardFormateur />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/group-list"
            element={
              <>
                <SideBarFormateur />
                <div className="main-wrapper">
                  <NavbarFormateur role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <GroupList />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/messages"
            element={
              <>
                <SideBarFormateur />
                <div className="main-wrapper">
                  <NavbarFormateur role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <Messages />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/user/:id"
            element={
              <>
                <SideBarFormateur />
                <div className="main-wrapper">
                  <NavbarFormateur role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <KidProfile />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/add-group"
            element={
              <>
                <SideBarFormateur />
                <div className="main-wrapper">
                  <NavbarFormateur role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <CreateGroup />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <SideBarFormateur />
                <div className="main-wrapper">
                  <NavbarFormateur role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <ParametresPage />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/project"
            element={
              <>
                <SideBarFormateur />
                <div className="main-wrapper">
                  <NavbarFormateur role={role} setLogin={setLogin} />
                  <div className="content-wrapper">
                    <KidsProjects />
                  </div>
                </div>
              </>
            }
          />
          {/* ... Other formateur-specific routes ... */}
          <Route path="*" element={<Navigate to="/dashboard/formateur" />} />
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
