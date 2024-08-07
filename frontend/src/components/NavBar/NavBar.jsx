import React, { useState } from 'react'
import Logo from '../../assets/grainesLogo.svg'
import LoopIcon from '../../assets/loopIcon.svg'
import "./navBar.css"

export const NavBar = () =>{
  const [navBarSelectedIndex, setNavBarSelectedIndex] = useState(-1);
  const [selectedContent, setSelectedContent] = useState(0);
  return (
    <div className="bar">
      <img className="logo" src= {Logo} />
      <div className="group-list-search-bar">
        <input type="text" placeholder="Search..."/>
        <img src={LoopIcon}/>
      </div>
    </div>
  )
}
