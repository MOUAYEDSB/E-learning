import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import {DashboardIcon} from "../../assets/DashboardIcon";
import {HomeIcon} from "../../assets/HomeIcon";
import {UserIcon} from "../../assets/UserIcon";
import {GroupIcon} from "../../assets/GroupIcon";
import {MessageIcon} from "../../assets/MessageIcon";
import {SettingsIcon} from "../../assets/SettingsIcon";
import {NavbarArrowIcon} from "../../assets/NavbarArrowIcon";
import "./sideBar.css"

export const SideBar = () =>{
  
  const [navBarSelectedIndex, setNavBarSelectedIndex] = useState(-1);
  const [navBarSubSelectedIndex, setNavBarSubSelectedIndex] = useState(-1);
  return (
    <div className="sideBar">
        <div className="seperator" />
        <div className="sideBar-buttons">
          <div className={`sideBar-btn ${navBarSelectedIndex == 0?"selected":""}`} onClick={() => {setNavBarSelectedIndex(0);}}>
            <div className="sideBar-btn-icon">
              <DashboardIcon fillColor={navBarSelectedIndex == 0?"black":"white"}/>
            </div>
            <label>Dashboard</label>
          </div>
          <div className={`sideBar-btn ${navBarSelectedIndex == 1?"selected":""}`} onClick={() => {setNavBarSelectedIndex(1);}}>
            <div className="sideBar-btn-icon">
              <HomeIcon fillColor={navBarSelectedIndex == 1?"black":"white"}/>
            </div>
            <label>Home</label>
          </div>
          <div className={`sideBar-btn-group ${navBarSelectedIndex == 2?"open":""}`}>
            <div className={`sideBar-btn ${navBarSelectedIndex == 2?"selected":""}`} onClick={() => {navBarSelectedIndex == 2? setNavBarSelectedIndex(-1) : setNavBarSelectedIndex(2);}}>
              <div className="sideBar-btn-icon">
                <UserIcon strokeColor={navBarSelectedIndex == 2?"black":"white"}/>
              </div>
              <label >Liste des utilisateurs</label>
              <div className="sideBar-btn-arrow-icon">
                <NavbarArrowIcon fillColor={navBarSelectedIndex == 2?"#2E294E":"white"}/>
              </div>
            </div>
            <div className="sideBar-subBtn-group">
              <Link to="/users/parents">
                <div onClick={() => {setNavBarSubSelectedIndex(0);}}>
                  <label className={`sideBar-subBtn-label ${navBarSubSelectedIndex == 0?"selected":""}`}>Parents</label>
                </div>
              </Link>
              <Link to="/users/seeds">
                <div onClick={() => {setNavBarSubSelectedIndex(1);}}>
                  <label className={`sideBar-subBtn-label ${navBarSubSelectedIndex == 1?"selected":""}`}>Graines</label>
                </div>
              </Link>
              <Link to="/users/mentors">
                <div onClick={() => {setNavBarSubSelectedIndex(2);}}>
                  <label className={`sideBar-subBtn-label ${navBarSubSelectedIndex == 2?"selected":""}`}>Formateurs</label>
                </div>
              </Link>
            </div>
          </div>
          <Link to="/group-list">
          <div className={`sideBar-btn ${navBarSelectedIndex == 3?"selected":""}`} onClick={() => {setNavBarSelectedIndex(3);}}>
            <div className="sideBar-btn-icon">
              <GroupIcon fillColor={navBarSelectedIndex == 3?"black":"white"}/>
            </div>
            <label>Groupes</label>
          </div>
          </Link>
          <Link to="/messages">
          <div className={`sideBar-btn ${navBarSelectedIndex == 4?"selected":""}`} onClick={() => {setNavBarSelectedIndex(4);}}>
            <div className="sideBar-btn-icon">
              <MessageIcon fillColor={navBarSelectedIndex == 4?"black":"white"}/>
            </div>
            <label>Messages</label>
          </div>
          </Link>
          <div className={`sideBar-btn ${navBarSelectedIndex == 5?"selected":""}`} onClick={() => {setNavBarSelectedIndex(5);}}>
            <div className="sideBar-btn-icon">
              <SettingsIcon fillColor={navBarSelectedIndex == 5?"black":"white"}/>
            </div>
            <label>Paramétres</label>
          </div>
        </div>
      </div>
  )
}
