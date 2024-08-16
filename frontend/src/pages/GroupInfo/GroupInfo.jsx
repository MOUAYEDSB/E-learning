import "./groupInfo.css"
import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import Select from "react-select";
import { assets } from "../../assets/assets"
import { DataGrid } from "../../components/DataGrid/DataGrid";

export const GroupInfo = () =>{
  let {groupID} = useParams();
  const [selectedContent, setSelectedContent] = useState(0);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  const columns = [
    { field: 'fullName', headerName: 'Nom', type : 'text', img: 'profilePicUrl', width: '180px', minWidth: '120px', sort: true, },
    { field: 'email', headerName: 'Adresse E-mail', type : 'text', width: '280px', minWidth: '250px'},
    { field: 'phone', headerName: 'Téléphone', type : 'text', width: '150px',minWidth: "120px"},
    { field: 'status', headerName: 'Status', type : 'status',options: {online: ['#d3efdf','#508d57'],offline: ['#f7ddd8','#b71d18']}, width: '80px',minWidth: '80px', sort: true},
  ];

  


  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#D7D7D7',
      borderRadius: "0.5rem",
      minHeight: '45px',
      height: '45px',
      fontFamily: "Poppins",
      color: "black !important",
      boxShadow: state.isFocused ? null : null,
    }),
    option: (styles) => ({
      ...styles,
      fontFamily: "Poppins",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black !important",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: '45px',
      padding: '0 1.5rem',
    }),
    placeholder: (provided, state) => ({
      ...provided,
    }),
    input: (provided, state) => ({
      ...provided,
      margin: '0px',
      padding:'0px',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '45px',
    }),
  };

  return (
    <div className="container">
        <label className="nav-label">Pages &gt; Espace Admin </label>
        <label className="nav-label2">Groupes &gt; nomGroupe</label>
        <div className="view-wrapper add-group-wrapper">
            <div className="group-info-wrapper">
                <label className="group-info-label">Nom du groupe</label>
                <input type="text" className="group-info-input"/>
            </div>
            <div className="group-info-input-group">
                <div className="group-info-wrapper">
                    <label className="group-info-label">Categorie</label>
                    <input type="text" className="group-info-input"/>
                </div>
                <div className="group-info-wrapper">
                    <label className="group-info-label">Tranche d'age</label>
                    <input type="text" className="group-info-input"/>
                </div>
            </div>
            <div className="group-info-wrapper">
                <label className="group-info-label">Description</label>
                <textarea type="text" className="group-info-input"/>
            </div>
            <div className="group-info-wrapper">
                <label className="group-info-label">Formateur</label>
                <Select options={options} styles={customStyles} placeholder="Selectioner..." type="text" />
            </div>
            <div className="group-info-wrapper">
                <label className="group-info-label">Liste des Graines</label>
                
            </div>
            <button className="save-group-btn">Enregistrer</button>
        </div>
    </div>
  )
}