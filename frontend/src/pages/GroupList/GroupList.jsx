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
      {selectedContent == 0 &&
      <div className="group-list-panel">
        <div onClick={() => {setSelectedContent(1);}}>
          <Groupcard groupName ="Groupe 1" groupAge="8 Membres | 8-12 Ans" color="#30BCED" />
        </div>
        <div onClick={() => {setSelectedContent(1);}}>
          <Groupcard groupName ="Groupe 2" groupAge="6 Membres | 10-16 Ans" color="#FFD237"/>
        </div>
        <Link to="/add-group">
        <div className="add-group-btn">
          <label className="add-group-btn-label">Ajouter un groupe</label>
          <div className="add-group-btn-icon-border">
            <img className="group-card-icon" src={assets.PlusIcon}/>
          </div>
        </div>
        </Link>
      </div>}
      {selectedContent == 1 &&
      <div className="view-group-panel">
        <ul className="student-list" style={{listStyleType : "none"}}>
          <li className="student-list-item">
            <label className= "name column-title">Nom d'élève</label>
            <label className= "email column-title">Addresse E-mail</label>
            <label className= "number column-title">Numéro telphonique</label>
            <label className= "status column-title">Status</label>
            <label className= "action column-title">Action</label>
          </li>
          <div className="student-list-seperator"></div>
          <li className="student-list-item">
            <div className= "name">
              <img/>
              <label >Youssef Turki</label>
            </div>
            <label className= "email">youssef.turki@gmail.com</label>
            <label className= "number">94 613 558</label>
            <div className= "status">
              <label style={{backgroundColor:`${true?"#48BB78" :"#CBD5E0"}`}}>{true?"Online" :"Offline"}</label>
            </div>
            <div className= "action action-item">
              <div>
                <img src={assets.DeleteIcon}/>
                <label>DELETE</label>
              </div>
              <div>
                <img src={assets.EditIcon}/>
                <label>EDIT</label>
              </div>
            </div>
          </li>
          <div className="student-list-seperator"></div>
          <li className="student-list-item">
            <div className= "name">
              <img/>
              <label >Yasmine Ayadi</label>
            </div>
            <label className= "email">yasmine.ayadi@gmail.com</label>
            <label className= "number">25 684 513</label>
            <div className= "status">
              <label style={{backgroundColor:`${false?"#48BB78" :"#CBD5E0"}`}}>{false?"Online" :"Offline"}</label>
            </div>
            <div className= "action action-item">
              <div>
                <img src={assets.DeleteIcon}/>
                <label>DELETE</label>
              </div>
              <div>
                <img src={assets.EditIcon}/>
                <label>EDIT</label>
              </div>
            </div>
          </li>
          <div className="student-list-seperator"></div>
          <li className="student-list-item">
            <div className= "name">
              <img/>
              <label >Rayen Turki</label>
            </div>
            <label className= "email">rayen.turki@gmail.com</label>
            <label className= "number">25 163 894</label>
            <div className= "status">
              <label style={{backgroundColor:`${1==1?"#48BB78" :"#CBD5E0"}`}}>{true?"Online" :"Offline"}</label>
            </div>
            <div className= "action action-item">
              <div>
                <img src={assets.DeleteIcon}/>
                <label>DELETE</label>
              </div>
              <div>
                <img src={assets.EditIcon}/>
                <label>EDIT</label>
              </div>
            </div>
          </li><div className="student-list-seperator"></div>
          <li className="student-list-item">
            <div className= "name">
              <img/>
              <label >Sarah Ayari</label>
            </div>
            <label className= "email">sarah.ayari@gmail.com</label>
            <label className= "number">90 236 548</label>
            <div className= "status">
              <label style={{backgroundColor:`${1==1?"#48BB78" :"#CBD5E0"}`}}>{true?"Online" :"Offline"}</label>
            </div>
            <div className= "action action-item">
              <div>
                <img src={assets.DeleteIcon}/>
                <label>DELETE</label>
              </div>
              <div>
                <img src={assets.EditIcon}/>
                <label>EDIT</label>
              </div>
            </div>
          </li>
        </ul>
      </div>}
    </div>
  )
}