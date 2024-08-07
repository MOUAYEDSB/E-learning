import "./addGroup.css"
import React, { useState } from 'react'
import Select from "react-select";
import { assets } from "../../assets/assets"
import { DataGrid } from "../../components/DataGrid/DataGrid";

export default function AddGroup() {
  const [selectedContent, setSelectedContent] = useState(0);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  const columns = [
    { field: 'title', headerName: 'Titre', type : 'select', options: ['Mr','Mme'] , width: '120px', minWidth: '85px'},
    { field: 'lastName', headerName: 'Nom', type : 'text', width: '100px', minWidth: '80px', sort: true},
    { field: 'firstName', headerName: 'Prénom', type : 'text', width: '100px', minWidth: '90px', sort: true},
    { field: 'email', headerName: 'Adresse E-mail', type : 'text', width: '250px', minWidth: '250px'},
    { field: 'address', headerName: 'Adresse', type : 'text', width: '150px',minWidth: "100px"},
    { field: 'phone', headerName: 'Téléphone', type : 'text', width: '150px',minWidth: "120px"},
    { field: 'age', headerName: 'Age', type : 'number', width: '60px', minWidth: "60px", sort: true},
    { field: 'status', headerName: 'Status', type : 'status',options: {online: '#48BB78',offline: '#d0d0d0'}, width: '80px',minWidth: '80px'},
    { field: 'action', headerName: 'Action', type : 'edit', width: '100px', minWidth: '65px'},
  ];

  const [items, setItems] = useState([
    {
      title: "Mme",
      lastName: "Smith",
      firstName: "Jane",
      email: "jane.smith@example.com",
      address: "456 Oak St",
      phone: "987-654-3210",
      status: "offline",
      age: 28
    },
    {
      title: "Mr",
      lastName: "Johnson",
      firstName: "John",
      email: "john.johnson@example.com",
      address: "123 Maple Ave",
      phone: "555-123-4567",
      status: "online",
      age: 35
    },
    {
      title: "Mme",
      lastName: "Williams",
      firstName: "Emily",
      email: "emily.williams@example.com",
      address: "789 Pine Rd",
      phone: "555-987-6543",
      status: "offline",
      age: 42
    },
    {
      title: "Mr",
      lastName: "Brown",
      firstName: "Michael",
      email: "michael.brown@example.com",
      address: "321 Elm St",
      phone: "555-555-5555",
      status: "online",
      age: 30
    },
    {
      title: "Mme",
      lastName: "Jones",
      firstName: "Laura",
      email: "laura.jones@example.com",
      address: "654 Birch Blvd",
      phone: "555-666-7777",
      status: "offline",
      age: 27
    },
    {
      title: "Mr",
      lastName: "Garcia",
      firstName: "Carlos",
      email: "carlos.garcia@example.com",
      address: "987 Cedar Ln",
      phone: "555-444-3333",
      status: "online",
      age: 40
    },
    {
      title: "Mme",
      lastName: "Martinez",
      firstName: "Sofia",
      email: "sofia.martinez@example.com",
      address: "345 Oakwood Dr",
      phone: "555-111-2222",
      status: "offline",
      age: 33
    },
    {
      title: "Mme",
      lastName: "Rodriguez",
      firstName: "Ana",
      email: "ana.rodriguez@example.com",
      address: "876 Maplewood Ave",
      phone: "555-888-9999",
      status: "online",
      age: 29
    },
    {
      title: "Mr",
      lastName: "Lee",
      firstName: "David",
      email: "david.lee@example.com",
      address: "234 Cedar Ave",
      phone: "555-777-6666",
      status: "offline",
      age: 37
    },
    {
      title: "Mme",
      lastName: "Taylor",
      firstName: "Olivia",
      email: "olivia.taylor@example.com",
      address: "543 Willow St",
      phone: "555-222-3333",
      status: "online",
      age: 31
    },
    {
      title: "Mr",
      lastName: "Wilson",
      firstName: "James",
      email: "james.wilson@example.com",
      address: "678 Pine St",
      phone: "555-999-8888",
      status: "offline",
      age: 45
    },
    {
      title: "Mme",
      lastName: "Anderson",
      firstName: "Sarah",
      email: "sarah.anderson@example.com",
      address: "432 Maplewood Dr",
      phone: "555-333-4444",
      status: "online",
      age: 26
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