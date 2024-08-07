import "./addGroup.css"
import React, { useState } from 'react'
import Select from "react-select";
import { assets } from "../../assets/assets"
import { DataGrid } from "../../components/DataGrid/DataGrid";

export const AddGroup = () =>{
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

  const [items, setItems] = useState([
    {
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      status: "offline",
      profilePicUrl: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      fullName: "John Johnson",
      email: "john.johnson@example.com",
      phone: "555-123-4567",
      status: "online",
      profilePicUrl: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      fullName: "Emily Williams",
      email: "emily.williams@example.com",
      phone: "555-987-6543",
      status: "offline",
      profilePicUrl: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      fullName: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "555-555-5555",
      status: "online",
      profilePicUrl: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      fullName: "Laura Jones",
      email: "laura.jones@example.com",
      phone: "555-666-7777",
      status: "offline",
      profilePicUrl: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
      fullName: "Carlos Garcia",
      email: "carlos.garcia@example.com",
      phone: "555-444-3333",
      status: "online",
      profilePicUrl: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      fullName: "Sofia Martinez",
      email: "sofia.martinez@example.com",
      phone: "555-111-2222",
      status: "offline",
      profilePicUrl: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
      fullName: "Ana Rodriguez",
      email: "ana.rodriguez@example.com",
      phone: "555-888-9999",
      status: "online",
      profilePicUrl: "https://randomuser.me/api/portraits/women/5.jpg"
    },
    {
      fullName: "David Lee",
      email: "david.lee@example.com",
      phone: "555-777-6666",
      status: "offline",
      profilePicUrl: "https://randomuser.me/api/portraits/men/4.jpg"
    },
    {
      fullName: "Olivia Taylor",
      email: "olivia.taylor@example.com",
      phone: "555-222-3333",
      status: "online",
      profilePicUrl: "https://randomuser.me/api/portraits/women/6.jpg"
    },
    {
      fullName: "James Wilson",
      email: "james.wilson@example.com",
      phone: "555-999-8888",
      status: "offline",
      profilePicUrl: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
      fullName: "Sarah Anderson",
      email: "sarah.anderson@example.com",
      phone: "555-333-4444",
      status: "online",
      profilePicUrl: "https://randomuser.me/api/portraits/women/7.jpg"
    }
  ]);

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
        <label className="nav-label">Pages / Espace Admin </label>
        <label className="nav-label2">Groupes / Creer Groupe</label>
        <div className="view-wrapper add-group-wrapper">
            <label className="page_title">Créer un Groupe</label>
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
                <DataGrid columns={columns} items={items} setItems={setItems}></DataGrid>
            </div>
            <button className="save-group-btn">Enregistrer</button>
        </div>
    </div>
  )
}