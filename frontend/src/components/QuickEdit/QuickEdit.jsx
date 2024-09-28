/* eslint-disable no-unused-vars */
import "./quickEdit.css"
import React, { useState } from 'react'
import Select from "react-select";
import { assets } from "../../assets/assets"

export const QuickEdit = () => {
  const [selectedContent, setSelectedContent] = useState(0);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
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
    <>
      <div className="quick-edit-input-group">
          <div className="quick-edit-info-wrapper">
            <label className="quick-edit-info-label">Prenom</label>
            <input type="text" className="quick-edit-info-input"/>
          </div>
          <div className="quick-edit-info-wrapper">
            <label className="quick-edit-info-label">Nom</label>
            <input type="text" className="quick-edit-info-input"/>
          </div>
      </div>
      <div className="quick-edit-input-group">
          <div className="quick-edit-info-wrapper">
            <label className="quick-edit-info-label">Telephone</label>
            <input type="text" className="quick-edit-info-input"/>
          </div>
          <div className="quick-edit-info-wrapper">
            <label className="quick-edit-info-label">Adresse E-mail</label>
            <input type="text" className="quick-edit-info-input"/>
          </div>
      </div>
      <div className="quick-edit-info-wrapper">
            <label className="quick-edit-info-label">Adresse</label>
            <input type="text" className="quick-edit-info-input full"/>
      </div>
      <div className="quick-edit-info-wrapper">
            <label className="quick-edit-info-label">Age</label>
            <input type="text" className="quick-edit-info-input"/>
      </div>
      <button className="quick-edit-save-btn">Enregistrer</button>
    </>
  )
}