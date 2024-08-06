import "./groupList.css"
import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import { assets } from "../../assets/assets"
import Groupcard from "../../components/GroupCard/GroupCard"

export default function GroupList() {
  const [selectedContent, setSelectedContent] = useState(0);
  return (
    <div className="container">
      <label className="group-list-title">{selectedContent == 0?"Listes des groupes": selectedContent == 1?"Groupe 1 | 8-12 Ans":"Ajouter un groupe"}</label>
      <div className="group-list-panel">
        <Link to="/group-info">
        <div onClick={() => {}}>
          <Groupcard groupName ="Groupe 1" groupAge="8 Membres | 8-12 Ans" color="#30BCED" />
        </div>
        </Link>
        <Link to="/group-info">
          <div onClick={() => {}}>
            <Groupcard groupName ="Groupe 2" groupAge="6 Membres | 10-16 Ans" color="#FFD237"/>
          </div>
        </Link>
        <Link to="/add-group">
        <div className="add-group-btn">
          <label className="add-group-btn-label">Ajouter un groupe</label>
          <div className="add-group-btn-icon-border">
            <img className="group-card-icon" src={assets.PlusIcon}/>
          </div>
        </div>
        </Link>
      </div>
    </div>
  )
}