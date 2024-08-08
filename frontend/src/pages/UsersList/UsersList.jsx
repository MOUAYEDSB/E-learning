import "./usersList.css"
import React, { useState } from 'react'
import { DataGrid } from "../../components/DataGrid/DataGrid";

export const UsersList = ({role}) => {
  const label = {parent:'Parents', seed:'Graines', mentor:'Formateurs'};
  const [selectedContent, setSelectedContent] = useState(0);
  
  const columns = [
    { field: 'fullName', headerName: 'Nom', type : 'text', img: 'profilePicUrl', width: '250px', minWidth: '200px', sort: true, },
    { field: 'email', headerName: 'Adresse E-mail', type : 'text', width: '320px', minWidth: '250px'},
    { field: 'phone', headerName: 'Téléphone', type : 'text', width: '180px',minWidth: "120px"},
    { field: 'status', headerName: 'Status', type : 'status',options: {online: ['#d3efdf','#508d57'],offline: ['#f7ddd8','#b71d18']}, width: '110px',minWidth: '76px', sort: true},
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

  return (
    <div className="container">
      <label className="nav-label">Pages / Espace Admin </label>
      <label className="nav-label2">Liste d’utilisateurs / {label[role]}</label>
      <DataGrid columns={columns} items={items} setItems={setItems} maxHeight='500px'></DataGrid>
    </div>
  )
}