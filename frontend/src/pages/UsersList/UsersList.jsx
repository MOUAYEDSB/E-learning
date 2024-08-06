import "./usersList.css"
import React, { useState } from 'react'
import { DataGrid } from "../../components/DataGrid/DataGrid";

export default function UsersList() {
  const [selectedContent, setSelectedContent] = useState(0);
  
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
    title:"Mr",
    lastName: "Doe",
    firstName: "John",
    email: "john.doe@example.com",
    address: "123 Main St",
    phone: "123-456-7890",
    status: "online",
    age: 30,
  },
  {
    title:"Mme",
    lastName: "Smith",
    firstName: "Jane",
    email: "jane.smith@example.com",
    address: "456 Oak St",
    phone: "987-654-3210",
    status: "offline",
    age: 28,
  }]);

  return (
    <div className="container">
      <DataGrid columns={columns} items={items} setItems={setItems}></DataGrid>
    </div>
  )
}