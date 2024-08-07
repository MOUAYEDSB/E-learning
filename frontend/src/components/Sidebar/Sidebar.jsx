import React, { useState } from 'react'
import './sideBar.css'
import { assets } from '../../assets/assets';
import {  NavLink, useNavigate } from 'react-router-dom';
const Sidebar = () => {
    const Navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='sidebar'>
        <div className="sidebar-logo-container">
            <div className="sidebar-logo">
                <img src={assets.LOGO}  alt="logo" />
            </div>
        </div>
        
        <hr />
        <NavLink exact to="/" activeClassName='active' className='sidebar-menu-item' onClick={()=>Navigate("/")}>
            <img src={assets.dashboardIcon} alt="" />
            <p>Dashboard</p>
            
        </NavLink>
        <NavLink exact to="/home" activeClassName='active' className="sidebar-menu-item" onClick={()=>Navigate("/home")}>
            <img src={assets.HomeIcon} alt=""  class="icon"/>
            <p>Home</p>
        </NavLink>
        <NavLink exact to="/users/formateur" activeClassName='active' className="sidebar-menu-item" onClick={()=>{Navigate("/users/formateur"),setIsOpen(!isOpen)}}>
            <img src={assets.usersIcon} alt="" />
            <p>Liste d'utilisateurs</p>
            <img src={assets.arrowDown} alt="" className="arrow" />
        </NavLink>
        {isOpen?<div>
            <div  className="sidebar-menu-item child" onClick={()=>Navigate("/users/formateur")}>
                <p>Formateurs</p>
            </div>
            <div   className="sidebar-menu-item child" onClick={()=>Navigate("/users/enfant")}>
                <p>Graines</p>
            </div>
            <div  className="sidebar-menu-item child" onClick={()=>Navigate("/users/parent")}>
                <p>Parents</p>
            </div>
        </div>:<></>}
        
        <NavLink exact to="/groupe" activeClassName='active' className="sidebar-menu-item" onClick={()=>Navigate("/groupe")}>
            <img src={assets.usersIcon} alt="" />
            <p>Groupes</p>
        </NavLink>
        <NavLink exact to="/message" activeClassName='active' className="sidebar-menu-item" onClick={()=>Navigate("/message")}>
            <img src={assets.MessageIcon} alt="" />
            <p>Message</p>
        </NavLink>
        <NavLink exact to="/parametre" activeClassName='active' className="sidebar-menu-item" onClick={()=>Navigate("/parametre")}>
            <img src={assets.ParametreIcon} alt="" />
            <p>Parametre</p>
        </NavLink>
        
        
    </div>
  )
}

export default Sidebar;