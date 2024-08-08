import React, { useState } from 'react'
import './sideBar.css'
import { assets } from '../../assets/assets';
import {  NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../assets/grainesLogo.svg'
import {DashboardIcon} from "../../assets/DashboardIcon";
import {HomeIcon} from "../../assets/HomeIcon";
import {UserIcon} from "../../assets/UserIcon";
import {GroupIcon} from "../../assets/GroupIcon";
import {MessageIcon} from "../../assets/MessageIcon";
import {SettingsIcon} from "../../assets/SettingsIcon";
import {NavbarArrowIcon} from "../../assets/NavbarArrowIcon";

export const Sidebar = () => {
    const Navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='sideBar'>
        <img className="sideBar-logo" src= {Logo} />
        <hr />
        <div className="sideBar-buttons">
            <NavLink exact to="/" activeClassName='active' className='sideBar-btn' onClick={()=>{Navigate("/"), setIsOpen(false)}}>
                <div className="sideBar-btn-icon">
                <DashboardIcon/>
                </div>
                <label>Dashboard</label>
            </NavLink>
            <NavLink exact to="/home" activeClassName='active' className="sideBar-btn" onClick={()=>{Navigate("/home"), setIsOpen(false)}}>
                <div className="sideBar-btn-icon">
                <HomeIcon/>
                </div>
                <label>Home</label>
            </NavLink>
            <div className={`sideBar-btn-group ${isOpen?"open":""}`}>
                <div className={`sideBar-btn ${isOpen?"active":""}`} onClick={() => {setIsOpen(!isOpen)}}>
                    <div className="sideBar-btn-icon">
                        <UserIcon/>
                    </div>
                    <label >Liste des utilisateurs</label>
                    <div className="sideBar-btn-arrow-icon">
                        <NavbarArrowIcon/>
                    </div>
                </div>
                <div className="sideBar-subBtn-group">
                    <NavLink exact to="/users/parents" activeClassName='active' className="sideBar-subBtn" onClick={()=>Navigate("/users/parents")}>
                        <div>
                            <label>Parents</label>
                        </div>
                    </NavLink>
                    <NavLink exact to="/users/seeds" activeClassName='active' className="sideBar-subBtn" onClick={()=>Navigate("/users/seeds")}>
                        <div>
                            <label>Graines</label>
                        </div>
                    </NavLink>
                    <NavLink exact to="/users/mentors" activeClassName='active' className="sideBar-subBtn" onClick={()=>Navigate("/users/mentors")}>
                        <div>
                            <label>Formateurs</label>
                        </div>
                    </NavLink>
                </div>
            </div>
            <NavLink exact to="/group-list" activeClassName='active' className="sideBar-btn" onClick={()=>{Navigate("/group-list"), setIsOpen(false)}}>
                <div className="sideBar-btn-icon">
                <GroupIcon/>
                </div>
                <label>Groupes</label>
            </NavLink>
            <NavLink exact to="/messages" activeClassName='active' className="sideBar-btn" onClick={()=>{Navigate("/Messages"), setIsOpen(false)}}>
                <div className="sideBar-btn-icon">
                <MessageIcon/>
                </div>
                <label>Messages</label>
            </NavLink>
            <NavLink exact to="/settings" activeClassName='active' className="sideBar-btn" onClick={()=>{Navigate("/settings"), setIsOpen(false)}}>
                <div className="sideBar-btn-icon">
                <SettingsIcon/>
                </div>
                <label>Paramétres</label>
            </NavLink>
        </div>
    </div>
  )
}